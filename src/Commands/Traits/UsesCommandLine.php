<?php

namespace Aero\Setup\Commands\Traits;

use Symfony\Component\Process\Process;

trait UsesCommandLine
{
    protected function runCommand(array $command): void
    {
        $process = new Process($command, null, null, null, null);
        if ('\\' !== DIRECTORY_SEPARATOR && file_exists('/dev/tty') && is_readable('/dev/tty')) {
            try {
                $process->setTty(true);
            } catch (\Exception $e) {
                dd($e);
            }
        }

        $process->setTimeout(null)->run();

        if (! $process->isSuccessful()) {
            dd($process->getErrorOutput());
        }
    }
}
