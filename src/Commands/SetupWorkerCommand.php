<?php

namespace Aero\Setup\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SetupWorkerCommand extends Command
{
    protected $signature = 'aero:setup:worker';
    protected $description = 'Run a worker that will setup the Aero store';
    protected $id;
    protected $board;
    protected $running = false;

    public static function addJob($job)
    {
    }

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
            'lastPinged' => now()->unix(),
        ];
    }

    protected static function getWorkerboardPath(): string
    {
        return storage_path('worker.json');
    }

    protected function getWorkerboard($canCreate = false): array
    {
        if (!file_exists($file = static::getWorkerboardPath())) {
            throw_unless($canCreate, new \Exception('Halted.'));
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
        if (!$this->runningWorkerIsThisOne()) {
            throw_if(
                now()->subSeconds(5)
                    ->lessThan(Carbon::createFromTimestamp($this->board['lastPinged'])),
                new \Exception('A worker is already is already running.')
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
        if (file_exists(storage_path("app/data.json"))) {
            $progress = 0;
            $currentJob = null;

            if ($data = json_decode(file_get_contents(storage_path("app/data.json")))) {
                if (is_array($data->jobs)) {
                    foreach ($data->jobs as $job) {
                        $progress += 8;

                        Storage::put('setup.json', json_encode((object) [
                            'progress' => $progress,
                            'currentJob' => $job->class,
                            'currentJobMessage' => $job->message,
                        ], JSON_PRETTY_PRINT));

                        try {
                            $this->processAction($job->class);
                        } catch (\Exception $e) {
                            // Write error to setup.json
                            dd('ERROR WITH JOB: ' . $job->class);
                        }
                    }
                }
            }
        }
    }

    protected function processAction(string $job, array $options = [])
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