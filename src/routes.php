<?php

use Aero\Setup\AttachCorsHeaders;
use Aero\Setup\Controllers\Actions\CheckAdminExists;
use Aero\Setup\Controllers\Actions\CheckCatalogContents;
use Aero\Setup\Controllers\Actions\Install;
use Aero\Setup\Controllers\Actions\PingProgress;
use Aero\Setup\Controllers\Actions\SaveUploadedImages;
use Aero\Setup\Controllers\Actions\SyncExistingSetup;
use Aero\Setup\Controllers\Actions\TestDatabaseConnection;
use Aero\Setup\Controllers\Actions\TestElasticsearchConnection;
use Aero\Setup\Controllers\RedirectToSetup;
use Aero\Setup\Controllers\ServeAsset;
use Aero\Setup\Controllers\ServeOptionsHeaders;
use Aero\Setup\Controllers\ServeSetup;
use Illuminate\Support\Facades\Route;

Route::get('/assets/{file}', '\\'.ServeAsset::class)->where('file', '.*');

Route::middleware(AttachCorsHeaders::class)->prefix('/setup')->group(function ($route) {
    $route->options('/actions/{endpoint}', '\\'.ServeOptionsHeaders::class)->where('endpoint', '.*');

    $route->get('/actions/sync', '\\'.SyncExistingSetup::class);
    $route->post('/actions/test-database-connection', '\\'.TestDatabaseConnection::class);
    $route->post('/actions/test-elasticsearch-connection', '\\'.TestElasticsearchConnection::class);
    $route->post('/actions/check-catalog-contents', '\\'.CheckCatalogContents::class);
    $route->post('/actions/check-admin-exists', '\\'.CheckAdminExists::class);
    $route->post('/actions/save-uploaded-images', '\\'.SaveUploadedImages::class);
    $route->post('/actions/install', '\\'.Install::class);

    $route->get('/actions/ping-progress', '\\'.PingProgress::class);

    $route->get('/', '\\'.ServeSetup::class)->name('aero.setup');
});

Route::fallback('\\'.RedirectToSetup::class);
