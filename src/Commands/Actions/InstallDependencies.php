<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\StoresErrors;
use Aero\Setup\Commands\Traits\UsesCommandLine;
use Aero\Setup\Commands\Traits\UsesComposer;
use Exception;

class InstallDependencies
{
    use UsesComposer, UsesCommandLine, StoresErrors;

    public function handle($options)
    {
        try {
            $composer = $this->findComposer();

            $this->runCommand([$composer, 'update', '--no-scripts', '--prefer-dist', '--quiet']);
            $this->runCommand([$composer, 'dump-autoload', '--quiet']);
        } catch (Exception $e) {
            $this->error($e);
        }

        try {
            $command = [PHP_BINARY, base_path('artisan'), 'aero:install', '--quiet'];

            if ($options->seed) {
                $command[] = '--seed';
            }

            $this->runCommand($command);
        } catch (Exception $e) {
            $this->error($e);
        }
    }
}
