<?php

namespace Aero\Setup\Controllers\Actions;

use Illuminate\Database\DatabaseManager;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use RuntimeException;

class CheckAdminExists
{
    public function __invoke(Request $request): Response
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
            $result = $manager->connection()->select('select count(*) from admins');

            return response(['existing' => $result > 0]);
        } catch (RuntimeException $_) {
            return response(['existing' => false]);
        }
    }
}
