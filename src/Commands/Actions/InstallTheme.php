<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\StoresErrors;
use Aero\Setup\Commands\Traits\UsesCommandLine;
use Exception;

class InstallTheme
{
    use UsesCommandLine, StoresErrors;

    public function handle($options)
    {
        try {
            $this->runCommand([
                PHP_BINARY,
                base_path('artisan'),
                'theme:install',
                $options->themeKey,
                "--name={$options->themeName}",
                '--no-interaction',
                '--quiet',
            ]);
        } catch (Exception $e) {
            $this->error($e);
        }
    }
}
