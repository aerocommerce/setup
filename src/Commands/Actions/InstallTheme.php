<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\UsesCommandLine;

class InstallTheme
{
    use UsesCommandLine;

    public function handle($options)
    {
        try {
            $this->runCommand([
                PHP_BINARY,
                base_path('artisan'),
                'theme:install',
                $options->themeName,
                '--no-interaction',
            ]);
        } catch (\Exception $e) {
            dd($e);
        }
    }
}
