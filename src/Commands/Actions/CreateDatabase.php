<?php

namespace Aero\Setup\Commands\Actions;

use Illuminate\Database\DatabaseManager;
use Illuminate\Http\Request;

class CreateDatabase
{
    public function handle($options)
    {
        $key = 'database.connections.'.config('database.default');

        $defaults = config($key, []);

        $config = [
            'database' => 'information_schema',
        ];

        try {
            config([$key => array_merge($defaults, $config)]);

            $manager = new DatabaseManager(app(), app('db.factory'));
            $manager->connection()->select("CREATE DATABASE {$options->database}");

            return true;
        } catch (\RuntimeException $_) {
            return false;
        }
    }
}
