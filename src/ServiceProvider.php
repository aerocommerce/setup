<?php

namespace Aero\Setup;

use Aero\Setup\Controllers\Actions\TestDatabaseConnection;
use Aero\Setup\Controllers\Actions\TestElasticsearchConnection;
use Aero\Setup\Controllers\AssetController;
use Aero\Setup\Controllers\RedirectToSetup;
use Aero\Setup\Controllers\ServeAsset;
use Aero\Setup\Controllers\ServeOptionsHeaders;
use Aero\Setup\Controllers\ServeSetup;
use Illuminate\Database\DatabaseManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;
use Illuminate\Support\Str;

class ServiceProvider extends BaseServiceProvider
{
    public function boot()
    {
        if (file_exists(storage_path('app/setup.json'))) {
            Route::get('/assets/{file}', '\\'.ServeAsset::class);

            Route::middleware(AttachCorsHeaders::class)->group(function ($route) {
                $route->options('/setup/actions/{endpoint}', '\\'.ServeOptionsHeaders::class)->where('endpoint', '.*');

                $route->post('/setup/actions/test-database-connection', '\\'.TestDatabaseConnection::class);
                $route->post('/setup/actions/test-elasticsearch-connection', '\\'.TestElasticsearchConnection::class);
            });

            Route::get('/setup', '\\'.ServeSetup::class)->name('aero.setup');

            Route::fallback('\\'.RedirectToSetup::class);
        }
    }
}
