<?php

namespace Aero\Setup\Commands\Actions;


use Aero\Setup\Commands\Traits\UsesCommandLine;
use Aero\Setup\Commands\Traits\UsesComposer;

class Finalize
{
    use UsesComposer, UsesCommandLine;

    public function handle($options)
    {
        try {
            $composer = $this->findComposer();

            $this->runCommand([$composer, 'remove', 'aerocommerce/setup']);

            unlink(storage_path('app/data.json'));
            unlink(storage_path('app/setup.json'));
            unlink(storage_path('worker.json'));
        } catch (\Exception $e) {
            dd($e);
        }

        return true;
    }
}
