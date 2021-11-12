<?php

namespace Aero\Setup\Commands;

use Aero\Setup\Files;
use Carbon\Carbon;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SetupCommand extends Command
{
    protected $signature = 'aero:setup';
    protected $description = 'Run a worker that will setup the Aero store';

    protected $id;
    protected $board;
    protected $running = false;

    public function handle()
    {
        $this->id = Str::uuid()->toString();

        $file = Files::SETUP;

        if (! Storage::exists($file)) {
            Storage::put($file, '{}');
        }

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

    protected function getWorkerboard($canCreate = false): array
    {
        $file = Files::WORKER;

        if (! Storage::exists($file)) {
            if (! $canCreate) {
                exit(1);
            }

            return $this->craftWorkerboard();
        }

        return json_decode(Storage::get($file), true);
    }

    protected function commitWorkerboard(array $board)
    {
        Storage::put(Files::WORKER, json_encode($board));
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
        $file = Files::JOBS;

        if (Storage::exists($file)) {
            $progress = 0;

            $setupFile = Files::SETUP;

            if ($data = json_decode(Storage::get($setupFile), true)) {
                foreach ($data['jobs'] ?? [] as $job) {
                    $progress += (100 / ($data['total'] ?? 1));

                    Storage::put($setupFile, json_encode(array_merge($data, [
                        'progress' => $progress,
                        'currentJob' => $job['class'],
                        'currentJobMessage' => $job['message'],
                    ]), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

                    try {
                        $this->processAction($job['class'], $job['options']);
                    } catch (Exception $_) {
                        $setup = json_decode(Storage::get($setupFile), true);

                        $setup['errors'][] = [
                            'Error with job '.substr($job['class'], strpos($job['class'], '\\') + 1),
                        ];

                        Storage::put($setupFile, json_encode($setup, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

                        break;
                    }

                    $this->removeJob();

                    $this->wait();
                }
            }

            Storage::put($setupFile, json_encode(array_merge($data ?? [], [
                'progress' => $progress,
            ]), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        }
    }

    protected function removeJob(): void
    {
        $file = Files::JOBS;

        if (Storage::exists($file)) {
            $data = json_decode(Storage::get($file), true);

            if (is_array($data['jobs'] ?? null)) {
                array_shift($data['jobs']);

                Storage::put($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            }
        } else {
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
        if ($this->running && Storage::exists($file = Files::WORKER)) {
            Storage::delete($file);
        }
    }
}
