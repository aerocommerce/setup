<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\StoresErrors;
use Aero\Setup\Commands\Traits\UsesCommandLine;
use Exception;

class SeedCatalogData
{
    use UsesCommandLine, StoresErrors;

    public function handle($options)
    {
        try {
            $this->runCommand([
                PHP_BINARY,
                base_path('artisan'),
                'aero:import:products:csv',
                $options->url,
                '--quiet',
            ]);
        } catch (Exception $e) {
            $this->error($e);
        }
    }
}
