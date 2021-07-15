<?php

namespace Aero\Setup\Commands\Actions;

use Illuminate\Database\DatabaseManager;
use Illuminate\Http\Request;

class CreateDatabase
{
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
        } catch (\RuntimeException $_) {
            return false;
        }

        return true;
    }
}
