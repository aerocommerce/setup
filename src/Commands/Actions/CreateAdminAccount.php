<?php

namespace Aero\Setup\Commands\Actions;


use Aero\Setup\Commands\Traits\StoresErrors;
use Aero\Setup\Commands\Traits\UsesCommandLine;
use Illuminate\Database\DatabaseManager;

class CreateAdminAccount
{
    use UsesCommandLine, StoresErrors;

    public function handle($options)
    {
        try {
            $manager = new DatabaseManager(app(), app('db.factory'));
            $manager->connection()->select("DELETE FROM {$options->database}.admins");
            $manager->connection()->select("ALTER TABLE {$options->database}.admins AUTO_INCREMENT = 1");
        } catch (\Exception $e) {
            $this->error($e);
        }

        try {
            $this->runCommand([
                PHP_BINARY,
                base_path('artisan'),
                'aero:setup:admin',
                $options->email,
                $options->password,
                $options->name,
            ]);
        } catch (\Exception $e) {
            $this->error($e);
        }

        return true;
    }
}
