<?php

namespace Aero\Setup\Controllers\Actions;

use Illuminate\Database\DatabaseManager;
use Illuminate\Http\Request;

class CheckCatalogContents
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
            $result = $manager->connection()->select('select COUNT(*) from products');

            if ($result > 0) {
                return response(['success' => true]);
            } else {
                return response(['success' => false]);
            }
        } catch (\RuntimeException $_) {
            return response(['success' => false]);
        }
    }
}
