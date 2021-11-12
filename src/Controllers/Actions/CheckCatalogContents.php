<?php

namespace Aero\Setup\Controllers\Actions;

use Illuminate\Database\DatabaseManager;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use RuntimeException;

class CheckCatalogContents
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

        try {
            config([$key => array_merge($defaults, $data)]);

            $manager = new DatabaseManager(app(), app('db.factory'));
            $result = $manager->connection()->select('select count(*) from products');

            return response(['success' => $result > 0]);
        } catch (RuntimeException $_) {
            return response(['success' => false]);
        }
    }
}
