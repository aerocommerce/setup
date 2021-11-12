<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\StoresErrors;
use Aero\Setup\Commands\Traits\UsesCommandLine;
use Aero\Setup\Commands\Traits\UsesComposer;
use Aero\Setup\Files;
use Exception;
use Illuminate\Support\Facades\Storage;

class Finalize
{
    use UsesComposer, UsesCommandLine, StoresErrors;

    public function handle($options)
    {
        try {
            $composer = $this->findComposer();

            $this->runCommand([$composer, 'remove', 'aerocommerce/setup', '--quiet']);

            Storage::delete([
                Files::JOBS,
                Files::SETUP,
                Files::WORKER,
            ]);
        } catch (Exception $e) {
            $this->error($e);
        }
    }
}
