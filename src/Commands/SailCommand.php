<?php

namespace Aero\Setup\Commands;

use Illuminate\Console\Command;
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

        $app['command'] = 'pwd';

        $app['depends_on'][] = 'elasticsearch';

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
    }
}
