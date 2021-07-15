<?php

namespace Aero\Setup\Commands\Actions;


use Aero\Setup\Commands\Traits\StoresErrors;

class WriteElasticsearchCredentials
{
    use StoresErrors;

    public function handle($options)
    {
        try {
            $env = file_get_contents(base_path('.env'));

            $env .= "STORE_IDENTIFIER={$options->identifier}" . PHP_EOL .
                PHP_EOL;

            $env .= "ELASTICSEARCH_HOST={$options->host}" . PHP_EOL .
                PHP_EOL;

            $env .= "ELASTICSEARCH_PORT={$options->port}" . PHP_EOL .
                PHP_EOL;

            file_put_contents(base_path('.env'), $env);
        } catch (\Exception $e) {
            $this->error($e);
        }
    }
}
