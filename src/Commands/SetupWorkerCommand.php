<?php

namespace Aero\Setup\Commands;

use Carbon\Carbon;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class SetupWorkerCommand extends Command
{
    protected $signature = 'setup';
    protected $description = 'Run a worker that will setup the Aero store';
    protected $id;
    protected $board;
    protected $running = false;

    public function handle()
    {
        $this->id = Str::uuid()->toString();
        $this->listen();
    }

    protected function listen()
    {
        $i = 0;
        while (true) {
            $this->board = $this->getWorkerboard($i++ === 0);
            $this->ensureThisOneIsRunning();
            $this->board['id'] = $this->id;
            $this->board['lastPinged'] = now()->timestamp;
            $this->readJobChain();
            $this->commitWorkerboard($this->board);
            $this->wait();
        }
    }

    protected function craftWorkerboard(): array
    {
        return [
            'id' => $this->id,
            'lastPinged' => now()->timestamp,
        ];
    }

    protected static function getWorkerboardPath(): string
    {
        return storage_path('app/worker.json');
    }

    protected function getWorkerboard($canCreate = false): array
    {
        if (! file_exists($file = static::getWorkerboardPath())) {
            if (! $canCreate) {
                exit(1);
            }

            return $this->craftWorkerboard();
        }

        return json_decode(file_get_contents($file), true);
    }

    protected function commitWorkerboard(array $board)
    {
        file_put_contents($this->getWorkerboardPath(), json_encode($board));
    }

    protected function runningWorkerIsThisOne(): bool
    {
        return $this->id === $this->board['id'];
    }

    protected function ensureThisOneIsRunning()
    {
        if (! $this->runningWorkerIsThisOne()) {
            throw_if(
                now()->subSeconds(5)
                    ->lessThan(Carbon::createFromTimestamp($this->board['lastPinged'])),
                new Exception('A worker is already is already running.')
            );
        }
        $this->running = true;
    }

    protected function wait()
    {
        sleep(1);
    }

    protected function readJobChain()
    {
        $file = storage_path('app/data.json');

        if (false && file_exists($file)) {
            $progress = 0;

            $setupFile = storage_path('app/setup.json');

            if ($data = json_decode(file_get_contents($file))) {
                if (is_array($data->jobs)) {
                    foreach ($data->jobs as $job) {
                        $progress += (100 / $data->total);

                        file_put_contents($setupFile, json_encode((object) [
                            'progress' => $progress,
                            'currentJob' => $job->class,
                            'currentJobMessage' => $job->message,
                        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

                        try {
                            $this->processAction($job->class, $job->options);
                        } catch (Exception $_) {
                            $setup = json_decode(file_get_contents($setupFile));
                            $setup->errors[] = [
                                'Error with job '.substr($job->class, strpos($job->class, '\\') + 1),
                            ];

                            file_put_contents($setupFile, json_encode($setup));

                            continue;
                        }

                        $this->removeJob();

                        $this->wait();
                    }
                }
            }
        }
    }

    protected function removeJob(): void
    {
        if (file_exists($file = storage_path('app/data.json'))) {
            if ($data = json_decode(file_get_contents($file))) {
                if (is_array($data->jobs)) {
                    array_shift($data->jobs);

                    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
                }
            }
        } else {
            if (file_exists($file = $this->getWorkerboardPath())) {
                unlink($file);
            }

            $this->__destruct();

            exit(0);
        }
    }

    protected function processAction(string $job, $options): void
    {
        app($job)->handle($options);
    }

    public function __destruct()
    {
        if ($this->running && file_exists($file = $this->getWorkerboardPath())) {
            unlink($file);
        }
    }
}
