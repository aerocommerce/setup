<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\StoresErrors;
use Aero\Setup\Commands\Traits\UsesCommandLine;
use Aero\Setup\Commands\Traits\UsesComposer;

class InstallDependencies
{
    use UsesComposer, UsesCommandLine, StoresErrors;

    public function handle($options)
    {
        try {
            $composer = $this->findComposer();

            $this->runCommand([$composer, 'update', '--no-scripts', '--prefer-dist', '--quiet']);
            $this->runCommand([$composer, 'run-script', 'post-create-project-cmd', '--quiet']);

            $this->runCommand([$composer, 'dump-autoload', '--quiet']);
        } catch (\Exception $e) {
           $this->error($e);
        }

        try {
            $this->updateDatabaseDetails($options);

            $command = [
                PHP_BINARY,
                base_path('artisan'),
                'aero:install',
                //'--quiet',
            ];

            if ($options->seed) {
                $command[] = '--seed';
            }

            $this->runCommand($command);
        } catch (\Exception $e) {
            $this->error($e);
        }

        return true;
    }

    protected function updateDatabaseDetails($options): void
    {
        $key = 'database.connections.'.config('database.default');

        $defaults = config($key, []);

        $config = [
            'host' => $options->host,
            'port' => $options->port,
            'username' => $options->username,
            'password' => $options->password,
            'database' => $options->database,
        ];

        config([$key => array_merge($defaults, $config)]);
    }
}
