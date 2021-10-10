<?php

namespace Aero\Setup\Commands\Traits;

use Exception;
use Symfony\Component\Process\Process;

trait UsesCommandLine
{
    protected function runCommand(array $command): void
    {
        $process = new Process($command, null, ['COMPOSER_MEMORY_LIMIT' => '-1'], null, null);
        if ('\\' !== DIRECTORY_SEPARATOR && file_exists('/dev/tty') && is_readable('/dev/tty')) {
            $process->setTty(true);
        }

        $process->setTimeout(null)->run();

        if (! $process->isSuccessful()) {
            throw new Exception($process->getErrorOutput());
        }
    }
}
