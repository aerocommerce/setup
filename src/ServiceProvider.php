<?php

namespace Aero\Setup;

use Aero\Setup\Commands\CreateAdminCommand;
use Aero\Setup\Commands\SetupWorkerCommand;
use Aero\Setup\Console\Commands\InstallCommand;
use Aero\Setup\Controllers\Actions\CheckAdminExists;
use Aero\Setup\Controllers\Actions\CheckCatalogContents;
use Aero\Setup\Controllers\Actions\CreateAgoraProject;
use Aero\Setup\Controllers\Actions\CreateProject;
use Aero\Setup\Controllers\Actions\Finalize;
use Aero\Setup\Controllers\Actions\PingProgress;
use Aero\Setup\Controllers\Actions\SaveUploadedImages;
use Aero\Setup\Controllers\Actions\TestDatabaseConnection;
use Aero\Setup\Controllers\Actions\TestElasticsearchConnection;
use Aero\Setup\Controllers\AssetController;
use Aero\Setup\Controllers\RedirectToSetup;
use Aero\Setup\Controllers\ServeAsset;
use Aero\Setup\Controllers\ServeOptionsHeaders;
use Aero\Setup\Controllers\ServeSetup;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;

class ServiceProvider extends BaseServiceProvider
{
    public function boot()
    {
        if (file_exists(storage_path('app/setup.json'))) {
            Route::get('/assets/{file}', '\\'.ServeAsset::class);

            Route::middleware(AttachCorsHeaders::class)->group(function ($route) {
                $route->options('/setup/actions/{endpoint}', '\\'.ServeOptionsHeaders::class)->where('endpoint', '.*');

                $route->post('/setup/actions/create-project', '\\'.CreateAgoraProject::class);
                $route->post('/setup/actions/test-database-connection', '\\'.TestDatabaseConnection::class);
                $route->post('/setup/actions/test-elasticsearch-connection', '\\'.TestElasticsearchConnection::class);
                $route->post('/setup/actions/check-catalog-contents', '\\'.CheckCatalogContents::class);
                $route->post('/setup/actions/check-admin-exists', '\\'.CheckAdminExists::class);
                $route->post('/setup/actions/save-uploaded-images', '\\'.SaveUploadedImages::class);
                $route->post('/setup/actions/finalize', '\\'.Finalize::class);

                $route->get('/setup/actions/ping-progress', '\\'.PingProgress::class);
            });

            Route::get('/setup', '\\'.ServeSetup::class)->name('aero.setup');

            Route::fallback('\\'.RedirectToSetup::class);
        }

        $this->commands([
            SetupWorkerCommand::class,
            CreateAdminCommand::class,
        ]);
    }
}
