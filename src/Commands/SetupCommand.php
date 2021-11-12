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
    protected $i = 0;
    protected $board;
    protected $running = false;

    public function handle()
    {
        $this->id = Str::uuid()->toString();

        if (! Storage::exists(Files::SETUP)) {
            $this->initialBoot();
        }

        $this->listen();
    }

    protected function initialBoot()
    {
        $filesToRemove = [
            public_path('/robots.txt'),
            base_path('/resources/views/welcome.blade.php'),
        ];

        foreach ($filesToRemove as $file) {
            if (file_exists($file)) {
                unlink($file);
            }
        }

        $routesFilesToClear = [
            base_path('/routes/web.php'),
            base_path('/routes/api.php'),
        ];

        foreach ($routesFilesToClear as $path) {
            if (file_exists($path)) {
                $contents = file_get_contents($path);

                $contents = preg_replace('/(^Route::.*\;)/ms', '', $contents);

                file_put_contents($path, $contents);
            }
        }

        Storage::put(Files::SETUP, '{}');
    }

    protected function listen()
    {
        while (true) {
            $this->preFlight();
            $this->readJobChain();
            $this->postFlight();
        }
    }

    protected function preFlight()
    {
        $this->board = $this->getWorkerboard($this->i++ === 0);
        $this->ensureThisOneIsRunning();
        $this->board['id'] = $this->id;
        $this->board['lastPinged'] = now()->timestamp;
    }

    protected function postFlight()
    {
        $this->commitWorkerboard($this->board);
        $this->wait();
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
            $this->postFlight();

            $setupFile = Files::SETUP;

            $data = json_decode(Storage::get($file), true);

            $total = $data['total'] ?? 1;
            $increment = 100 / $total;

            $jobs = $data['jobs'] ?? [];
            $progress = ($total - count($jobs)) * $increment;

            if (count($jobs) && ($setupData = json_decode(Storage::get($setupFile), true))) {
                foreach ($jobs as $job) {
                    $this->preFlight();

                    $progress += $increment;

                    Storage::put($setupFile, json_encode(array_merge($setupData, [
                        'progress' => $progress,
                        'currentJob' => $job['class'],
                        'currentJobMessage' => $job['message'],
                    ]), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

                    try {
                        $this->processAction($job['class'], (object) ($job['options'] ?? []));

                        $this->removeJob();
                    } catch (Exception $_) {
                        $setup = json_decode(Storage::get($setupFile), true);

                        $setup['errors'][] = [
                            'Error with job '.class_basename($job['class']),
                        ];

                        Storage::put($setupFile, json_encode($setup, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

                        break;
                    } finally {
                        $this->postFlight();
                    }
                }
            }

            Storage::put($setupFile, json_encode(array_merge($setupData ?? [], [
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
