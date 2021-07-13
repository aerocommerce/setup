<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Composer;
use Illuminate\Support\Facades\Artisan;
use Symfony\Component\Process\Process;

class InstallDependencies
{
    public function handle($options): bool
    {
        try {
            $composer = $this->findComposer();

            $commands = [
                $composer.' update --no-scripts --prefer-dist',
                $composer.' run-script post-root-package-install --quiet',
                $composer.' run-script post-create-project-cmd --quiet',
                $composer.' run-script post-autoload-dump --quiet',
            ];

            $process = Process::fromShellCommandline(implode(' && ', $commands));

            if ('\\' !== DIRECTORY_SEPARATOR && file_exists('/dev/tty') && is_readable('/dev/tty')) {
                $process->setTty(true);
            }

            $process->run();
        } catch (\Exception $e) {
            dd($e);
        }

        try {
            Artisan::call('migrate');
        } catch (\Exception $e) {
            dd($e);
        }

        return true;
    }

    protected function findComposer(): string
    {
        $composerPath = getcwd().'/composer.phar';

        if (file_exists($composerPath)) {
            return '"'.PHP_BINARY.'" '.$composerPath;
        }

        return 'composer';
    }
}
