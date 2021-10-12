<?php

namespace Aero\Setup\Controllers\Actions;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

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
                'project.token' => 'required_if:project.type,existing_project',
                'project.databaseType' => 'required|string|in:new_database,existing_database',
                'project.database' => 'required|string',
                'project.databaseHost' => 'required|string',
                'project.databasePort' => 'required|int',
                'project.databaseUsername' => 'required|string',
                'project.databasePassword' => 'nullable|string',
                'project.storeIdentifier' => 'required|string',
                'project.elasticsearchConnectionType' => 'required|in:local,remote',
                'project.elasticsearchHost' => 'required|string',
                'project.elasticsearchPort' => 'required|int',
                'project.theme' => 'required|array',
                'project.theme.key' => 'required|string',
                'project.admin' => 'required|array',
                'project.admin.create' => 'required|boolean',
                'project.admin.name' => 'required_with:admin.create|string',
                'project.admin.email' => 'required_with:admin.create|string',
                'project.admin.password' => 'required_with:admin.create|string',
                'project.catalog' => 'required|array',
                'project.catalog.type' => 'required|string|in:import,skip_import',
                'project.catalog.url' => 'required_if:catalog.type,import|string',
            ]);
        } catch (Exception $e) {
            if ($e instanceof ValidationException) {
                $errors = $e->errors();
            } else {
                $errors = [$e->getMessage()];
            }

            return ['success' => false, 'errors' => $errors];
        }

        $json = json_decode(Storage::get('setup.json'), true);

        $json['data'] = $data;

        Storage::put('setup.json', json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        $jobs = [];

        Storage::put('jobs.json', json_encode($jobs, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        return [
            'success' => true,
            'errors' => $json['errors'] ?? [],
        ];
    }
}
