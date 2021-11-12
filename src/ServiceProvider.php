<?php

namespace Aero\Setup;

use Aero\Setup\Commands\CreateAdminCommand;
use Aero\Setup\Commands\SailCommand;
use Aero\Setup\Commands\SetupCommand;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;

class ServiceProvider extends BaseServiceProvider
{
    public function boot()
    {
        $this->registerRoutes();

        $this->commands([
            SailCommand::class,
            SetupCommand::class,
            CreateAdminCommand::class,
        ]);
    }

    protected function shouldRegisterSetup(): bool
    {
        return file_exists(storage_path('app/'.Files::SETUP));
    }

    protected function registerRoutes(): void
    {
        if ($this->shouldRegisterSetup()) {
            require __DIR__.'/routes.php';
        }
    }
}
