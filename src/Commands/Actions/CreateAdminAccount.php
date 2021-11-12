<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\StoresErrors;
use Aero\Setup\Commands\Traits\UsesCommandLine;
use Exception;

class CreateAdminAccount
{
    use UsesCommandLine, StoresErrors;

    public function handle($options)
    {
        try {
            $this->runCommand([
                PHP_BINARY,
                base_path('artisan'),
                'aero:setup:admin',
                $options->email,
                $options->password,
                $options->name,
            ]);
        } catch (Exception $e) {
            $this->error($e);
        }
    }
}
