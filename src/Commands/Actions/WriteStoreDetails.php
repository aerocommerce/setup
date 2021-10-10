<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\InteractsWithEnv;
use Aero\Setup\Commands\Traits\StoresErrors;
use Exception;

class WriteStoreDetails
{
    use InteractsWithEnv, StoresErrors;

    public function handle($options)
    {
        try {
            $this->setEnvValue('APP_NAME', $options->name);
            $this->setEnvValue('APP_URL', $options->host);
        } catch (Exception $e) {
            $this->error($e);
        }
    }
}
