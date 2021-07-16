<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\StoresErrors;
use Illuminate\Database\DatabaseManager;

class CreateDatabase
{
    use StoresErrors;

    public function handle($options)
    {
        try {
            $key = 'database.connections.'.config('database.default');

            $defaults = config($key, []);

            $config = [
                'host' => $options->host,
                'port' => $options->port,
                'username' => $options->username,
                'password' => $options->password,
                'database' => 'information_schema',
            ];

            config([$key => array_merge($defaults, $config)]);

            $manager = new DatabaseManager(app(), app('db.factory'));
            $manager->connection()->select("CREATE DATABASE {$options->database}");
        } catch (\RuntimeException $e) {
            $this->error($e);
        }

        return true;
    }
}
