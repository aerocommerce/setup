<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\StoresErrors;
use Aero\Setup\Commands\Traits\UsesCommandLine;

class InstallTheme
{
    use UsesCommandLine, StoresErrors;

    public function handle($options)
    {
        if ($options->themeKey && $options->themeName) {
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
            } catch (\Exception $e) {
                $this->error($e);
            }
        }
    }
}
