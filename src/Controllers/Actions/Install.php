<?php

namespace Aero\Setup\Controllers\Actions;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class Install
{
    public function __invoke(Request $request)
    {
        try {
            $data = $request->validate([
                'agora' => 'required|array',
                'agora.token' => 'required|string',
                'host' => 'required|string',
                'project' => 'required|array',
                'project.type' => 'required|string|in:new_project,existing_project',
                'project.name' => 'required|string',
                'project.token' => 'requiredIf:project.type,existing_project',
                'project.databaseType' => 'required|string|in:new_database,existing_database',
                'project.database' => 'required|string',
                'project.databaseHost' => 'required|string',
                'project.databasePort' => 'required|int',
                'project.databaseUsername' => 'required|string',
                'project.databasePassword' => 'required|string',
                'project.storeIdentifier' => 'required|string',
                'project.elasticsearchConnectionType' => 'required|in:local,remote',
                'project.elasticsearchHost' => 'required|string',
                'project.elasticsearchPort' => 'required|int',
                'project.theme' => 'required|array',
                'project.theme.key' => 'required|string',
                'admin' => 'required|array',
                'admin.create' => 'required|boolean',
                'admin.name' => 'requiredIf:admin.create|string',
                'admin.email' => 'requiredIf:admin.create|string',
                'admin.password' => 'requiredIf:admin.create|string',
                'catalog' => 'required|array',
                'catalog.type' => 'required|string|in:import,skip_import',
                'catalog.url' => 'requiredIf:catalog.type,import|string',
            ]);
        } catch (Exception $_) {
            return ['success' => false];
        }

        $data['total'] = count($data['jobs']);

        Storage::put('data.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        $json = json_decode(Storage::get('setup.json'));

        return [
            'success' => true,
            'errors' => $json->errors ?? [],
        ];
    }
}
