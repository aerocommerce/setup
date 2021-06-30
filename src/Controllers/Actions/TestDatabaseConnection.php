<?php

namespace Aero\Setup\Controllers\Actions;

use Illuminate\Database\DatabaseManager;
use Illuminate\Http\Request;

class TestDatabaseConnection
{
    public function __invoke(Request $request)
    {
        $data = $request->validate([
            'host' => 'required',
            'port' => 'required',
            'username' => 'required',
            'password' => 'nullable|string',
        ]);

        $key = 'database.connections.'.config('database.default');

        $defaults = config($key, []);

        $config = [
            'host' => $data['host'],
            'port' => $data['port'],
            'username' => $data['username'],
            'password' => $data['password'],
            'database' => 'information_schema',
        ];

        try {
            config([$key => array_merge($defaults, $config)]);

            $manager = new DatabaseManager(app(), app('db.factory'));
            $result = $manager->connection()->select('show databases');

            $databases = collect($result)->pluck('Database')->reject(function ($database) {
                return in_array($database, ['mysql', 'information_schema', 'performance_schema']);
            })->values();

            return response([
                'databases' => $databases,
            ]);
        } catch (\RuntimeException $e) {
            //
        } finally {
            config([$key => $defaults]);
        }

        return response([
            'message' => 'Could not connect to the database server using the provided details.'
        ], 422);
    }
}
