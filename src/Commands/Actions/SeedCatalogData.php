<?php

namespace Aero\Setup\Commands\Actions;


use Aero\Setup\Commands\Traits\UsesCommandLine;

class SeedCatalogData
{
    use UsesCommandLine;

    public function handle($options)
    {
        try {
            $this->runCommand([
                PHP_BINARY,
                base_path('artisan'),
                'aero:import:products:csv',
                $options->url,
            ]);
        } catch (\Exception $e) {
            dd($e);
        }
    }
}
