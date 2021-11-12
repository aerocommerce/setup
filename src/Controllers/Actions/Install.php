<?php

namespace Aero\Setup\Controllers\Actions;

use Aero\Setup\Files;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class Install
{
    public function __invoke(Request $request): Response
    {
        $file = Files::SETUP;

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
                'project.admin.name' => 'required_with:project.admin.create|string',
                'project.admin.email' => 'required_with:project.admin.create|string',
                'project.admin.password' => 'required_with:project.admin.create|string',
                'project.catalog' => 'required|array',
                'project.catalog.type' => 'required|string|in:import,skip_import',
                'project.catalog.url' => 'nullable|required_if:project.catalog.type,import|string',
            ]);

            throw_unless(Storage::exists($file), Exception::class);
        } catch (Exception $e) {
            if ($e instanceof ValidationException) {
                $errors = $e->errors();
            } else {
                $errors = [$e->getMessage()];
            }

            return response(['success' => false, 'errors' => $errors]);
        }

        $json = json_decode(Storage::get($file), true);

        $json['data'] = $data;

        Storage::put($file, json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        $jobs = [];

        Storage::put(Files::JOBS, json_encode($jobs, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        return response([
            'success' => true,
            'errors' => $json['errors'] ?? [],
        ]);
    }
}
