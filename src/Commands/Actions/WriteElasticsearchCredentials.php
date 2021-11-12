<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\InteractsWithEnv;
use Aero\Setup\Commands\Traits\StoresErrors;
use Exception;

class WriteElasticsearchCredentials
{
    use InteractsWithEnv, StoresErrors;

    public function handle($options)
    {
        try {
            $this->setEnvValue('STORE_IDENTIFIER', $options->identifier);
            $this->setEnvValue('ELASTICSEARCH_HOST', $options->host);
            $this->setEnvValue('ELASTICSEARCH_PORT', $options->port);
        } catch (Exception $e) {
            $this->error($e);
        }
    }
}
