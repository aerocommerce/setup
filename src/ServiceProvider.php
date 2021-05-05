<?php

namespace Aero\Setup;

use Aero\Setup\Controllers\AssetController;
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
            Route::get('/assets/{file}', [AssetController::class, 'file']);

            Route::options('/set-up/{endpoint}', function () {
                return response('')
                    ->header('Access-Control-Allow-Origin', '*')
                    ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                    ->header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
            })->where('endpoint', '.*');

            Route::post('/set-up/actions/database-connections', function (Request $request) {
                $name = $request->input('name', config('app.name'));

                $options = [
                    [],
                    ['database' => Str::slug($name)],
                    ['username' => 'homestead', 'password' => 'secret'],
                    ['username' => 'homestead', 'password' => 'secret', 'database' => Str::slug($name)],
                    ['database' => 'laravel'],
                    ['database' => 'homestead'],
                    ['username' => 'homestead', 'password' => 'secret', 'database' => 'homestead'],
                    ['database' => Str::slug($name, '')],
                    ['username' => 'homestead', 'password' => 'secret', 'database' => Str::slug($name, '')],
                    ['username' => 'root', 'password' => ''],
                ];

                $key = 'database.connections.'.config('database.default');

                $defaults = config($key, []);

                if ($defaults['database'] === 'laravel') {
                    $defaults['database'] = Str::slug($name, '_');
                }

                $defaults = config($key, []);

                $output = collect();

                foreach ($options as $config) {
                    config([$key => array_merge($defaults, $config)]);

                    try {
                        $entry = collect(config($key))->only('driver', 'host', 'port', 'database', 'username', 'password', 'unix_socket');
                        $id = $entry->join(',');

                        if (! $output->has($id)) {
                            $manager = new DatabaseManager(app(), app('db.factory'));
                            $manager->connection()->select('select 1');

                            $output->put($id, $entry);
                        }
                    } catch (\RuntimeException $e) {

                    } finally {
                        config([$key => $defaults]);
                    }
                }

                return response($output->values())
                    ->header('Access-Control-Allow-Origin', '*');
            });

            Route::get('/set-up', function () {
                return file_get_contents(__DIR__.'/../app/dist/index.html');
            })->name('aero.set-up');

            Route::fallback(function () {
                return redirect()->route('aero.set-up');
            });
        }
    }
}
