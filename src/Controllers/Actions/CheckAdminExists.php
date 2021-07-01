<?php

namespace Aero\Setup\Controllers\Actions;

use Illuminate\Database\DatabaseManager;
use Illuminate\Http\Request;

class CheckAdminExists
{
    public function __invoke(Request $request)
    {
        $data = $request->validate([
            'database' => 'required',
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
            'database' => $data['database'],
        ];

        try {
            config([$key => array_merge($defaults, $config)]);

            $manager = new DatabaseManager(app(), app('db.factory'));
            $result = $manager->connection()->select('select * from admins');

            if (count($result) > 0) {
                return response([true]);
            } else {
                return response([false]);
            }
        } catch (\RuntimeException $e) {
            return response([true]);
        } finally {
            config([$key => $defaults]);
        }

        return response([
            'message' => 'Could not connect to the database server using the provided details.'
        ], 422);
    }
}
