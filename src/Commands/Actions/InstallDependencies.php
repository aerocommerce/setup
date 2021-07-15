<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\UsesCommandLine;
use Aero\Setup\Commands\Traits\UsesComposer;
use Symfony\Component\Process\Process;

class InstallDependencies
{
    use UsesComposer, UsesCommandLine;

    public function handle($options)
    {
        try {
            $composer = $this->findComposer();

            $this->runCommand([$composer, 'update', '--no-scripts', '--prefer-dist']);
            $this->runCommand([$composer, 'run-script', 'post-create-project-cmd']);

            $this->runCommand([$composer, 'dump-autoload']);
        } catch (\Exception $e) {
            dd($e);
        }

        try {
            $this->runCommand([
                PHP_BINARY,
                base_path('artisan'),
                'queue:table'
            ]);
        } catch (\Exception $e) {
            dd($e);
        }

        try {
            $this->updateDatabaseDetails($options);

            $this->runCommand([
                PHP_BINARY,
                base_path('artisan'),
                'aero:install',
                '--seed',
            ]);
        } catch (\Exception $e) {
            dd($e);
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
