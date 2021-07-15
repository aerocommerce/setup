<?php

namespace Aero\Setup\Commands\Actions;


use Aero\Setup\Commands\Traits\UsesCommandLine;
use Illuminate\Database\DatabaseManager;

class StartWorker
{
    use UsesCommandLine;

    public function handle($options)
    {
        try {
            $this->runCommand([
                PHP_BINARY,
                base_path('artisan'),
                'aero:setup:worker'
            ]);
        } catch (\Exception $e) {
            dd($e);
        }
    }
}
