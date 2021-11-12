<?php

namespace Aero\Setup\Controllers\Actions;

use Aero\Setup\Commands\Actions\AddComposerDependencies;
use Aero\Setup\Commands\Actions\CreateAdminAccount;
use Aero\Setup\Commands\Actions\CreateAuthFile;
use Aero\Setup\Commands\Actions\CreateDatabase;
use Aero\Setup\Commands\Actions\CreateProject;
use Aero\Setup\Commands\Actions\CreateStoreConfig;
use Aero\Setup\Commands\Actions\Finalize;
use Aero\Setup\Commands\Actions\InstallDependencies;
use Aero\Setup\Commands\Actions\InstallTheme;
use Aero\Setup\Commands\Actions\SeedCatalogData;
use Aero\Setup\Commands\Actions\WriteDatabaseCredentials;
use Aero\Setup\Commands\Actions\WriteElasticsearchCredentials;
use Aero\Setup\Commands\Actions\WriteStoreDetails;
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
                'project.seed' => 'required|boolean',
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

        if ($data['project']['type'] === 'new_project') {
            $jobs[] = [
                'class' => CreateProject::class,
                'message' => 'Creating Agora project',
                'options' => [
                    'name' => $data['project']['name'],
                    'domain' => $data['host'],
                    'token' => $data['agora']['token'],
                ],
            ];
        } else {
            $jobs[] = [
                'class' => CreateAuthFile::class,
                'message' => 'Creating auth file',
                'options' => [
                    'token' => $data['project']['token'],
                ],
            ];
        }

        $jobs[] = [
            'class' => WriteStoreDetails::class,
            'message' => 'Writing store details',
            'options' => [
                'name' => $data['project']['name'],
                'host' => $data['host'],
            ],
        ];

        $jobs[] = [
            'class' => WriteDatabaseCredentials::class,
            'message' => 'Writing database credentials',
            'options' => [
                'host' => $data['project']['databaseHost'],
                'port' => $data['project']['databasePort'],
                'username' => $data['project']['databaseUsername'],
                'password' => $data['project']['databasePassword'],
                'database' => $data['project']['database'],
            ],
        ];

        if ($data['project']['databaseType'] === 'new_database') {
            $jobs[] = [
                'class' => CreateDatabase::class,
                'message' => 'Creating the database',
                'options' => [
                    'host' => $data['project']['databaseHost'],
                    'port' => $data['project']['databasePort'],
                    'username' => $data['project']['databaseUsername'],
                    'password' => $data['project']['databasePassword'],
                    'database' => $data['project']['database'],
                ],
            ];
        }

        $jobs[] = [
            'class' => WriteElasticsearchCredentials::class,
            'message' => 'Writing Elasticsearch credentials',
            'options' => [
                'identifier' => $data['project']['storeIdentifier'],
                'host' => $data['project']['elasticsearchHost'],
                'port' => $data['project']['elasticsearchPort'],
            ],
        ];

        //$jobs[] = [
        //    'class' => CreateStoreConfig::class,
        //    'message' => 'Creating store configuration',
        //    'options' => [
        //        'store_key' => $data['project.storeIdentifier'],
        //        'host' => $data['project.elasticsearchHost'],
        //        'port' => $data['project.elasticsearchPort'],
        //    ],
        //];

        $jobs[] = [
            'class' => AddComposerDependencies::class,
            'message' => 'Adding Composer dependencies',
        ];

        $jobs[] = [
            'class' => InstallDependencies::class,
            'message' => 'Installing Composer dependencies',
            'options' => [
                'seed' => $data['project']['seed'],
            ],
        ];

        $jobs[] = [
            'class' => InstallTheme::class,
            'message' => 'Installing the storefront theme',
            'options' => [
                'themeKey' => $data['project']['theme']['key'],
                'themeName' => explode('/', $data['project']['theme']['key'])[1] ?? 'default',
            ],
        ];

        if ($data['project']['catalog']['type'] === 'import') {
            $jobs[] = [
                'class' => SeedCatalogData::class,
                'message' => 'Seeding the catalog data',
                'options' => [
                    'url' => $data['project']['catalog']['url'],
                ],
            ];
        }

        if ($data['project.admin.create'] ?? false) {
            $jobs[] = [
                'class' => CreateAdminAccount::class,
                'message' => 'Creating an admin user account',
                'options' => [
                    'name' => $data['project']['admin']['name'],
                    'email' => $data['project']['admin']['email'],
                    'password' => $data['project']['admin']['password'],
                ],
            ];
        }

        $jobs[] = [
            'class' => Finalize::class,
            'message' => 'Finalizing',
        ];

        Storage::put(Files::JOBS, json_encode([
            'jobs' => $jobs,
            'total' => count($jobs),
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        return response([
            'success' => true,
            'errors' => $json['errors'] ?? [],
        ]);
    }
}
