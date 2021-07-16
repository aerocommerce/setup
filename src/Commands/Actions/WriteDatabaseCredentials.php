<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\InteractsWithEnv;
use Aero\Setup\Commands\Traits\StoresErrors;

class WriteDatabaseCredentials
{
    use InteractsWithEnv, StoresErrors;

    public function handle($options)
    {
        try {
            $this->setEnvValue('DB_CONNECTION', 'mysql');
            $this->setEnvValue('DB_HOST', $options->host);
            $this->setEnvValue('DB_PORT', $options->port);
            $this->setEnvValue('DB_DATABASE', $options->database);
            $this->setEnvValue('DB_USERNAME', $options->username);
            $this->setEnvValue('DB_PASSWORD', $options->password);
        } catch (\Exception $e) {
            $this->error($e);
        }
    }
}
