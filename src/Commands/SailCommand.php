<?php

namespace Aero\Setup\Commands;

use Aero\Setup\Init;
use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Symfony\Component\Yaml\Yaml;

class SailCommand extends Command
{
    protected $signature = 'aero:sail';

    protected $description = 'Configure the Aero requirements for running with Laravel Sail';

    public function handle()
    {
        $file = base_path('docker-compose.yml');

        if (! file_exists($file)) {
            return;
        }

        $config = Yaml::parse(file_get_contents($file));

        $appKey = array_keys($config['services'])[0];
        $app = $config['services'][$appKey];

        if (! in_array('elasticsearch', $app['depends_on'])) {
            $app['depends_on'][] = 'elasticsearch';
        }

        $config['services']['elasticsearch'] = [
            'image' => 'elasticsearch:7.14.2',
            'ports' => ['${FORWARD_ELASTIC_PORT:-9200}:9200'],
            'environment' => [
                'node.name=es01',
                'cluster.name=es-docker-cluster',
                'discovery.type=single-node',
                'bootstrap.memory_lock=true',
                'ES_JAVA_OPTS=-Xms512m -Xmx512m',
            ],
            'ulimits' => [
                'memlock' => [
                    'soft' => -1,
                    'hard' => -1,
                ],
            ],
            'volumes' => [
                'sailelasticsearch:/usr/share/elasticsearch/data',
            ],
            'networks' => [
                'sail',
            ],
            'healthcheck' => [
                'test' => ['CMD', 'wget', '--no-verbose', '--spider', 'http://localhost:9200'],
                'retries' => 3,
                'timeout' => '5s',
            ],
        ];

        $config['volumes']['sailelasticsearch'] = [
            'driver' => 'local',
        ];

        $config['services'][$appKey] = $app;

        $yaml = Yaml::dump($config, 4);

        file_put_contents($file, $yaml);

        $name = Str::title(Str::before(parse_url(config('app.url'), PHP_URL_HOST), '.'));

        Init::boot([
            'name' => str_replace(['-', '_'], ' ', $name),
            'databaseConnectionType' => 'local',
            'databaseHost' => $_SERVER['DB_HOST'],
            'databasePort' => $_SERVER['DB_PORT'],
            'databaseUsername' => $_SERVER['DB_USERNAME'],
            'databasePassword' => $_SERVER['DB_PASSWORD'],
            'databaseType' => 'existing_database',
            'database' => $_SERVER['DB_DATABASE'],
            'elasticsearchConnectionType' => 'local',
            'elasticsearchVersion' => 7,
            'elasticsearchHost' => 'elasticsearch',
            'elasticsearchPort' => 9200,
            'storeIdentifier' => $_SERVER['DB_DATABASE'],
        ]);
    }
}
