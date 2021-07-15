<?php

namespace Aero\Setup\Commands\Actions;


use Aero\Setup\Commands\Traits\StoresErrors;
use Illuminate\Support\Facades\File;

class WriteDatabaseCredentials
{
    use StoresErrors;

    public function handle($options)
    {
        try {
            $env = file_get_contents(base_path('.env'));

            $env .= "DB_CONNECTION=mysql" . PHP_EOL .
                "DB_HOST={$options->host}" . PHP_EOL .
                "DB_PORT={$options->port}" . PHP_EOL .
                "DB_DATABASE={$options->database}" . PHP_EOL .
                "DB_USERNAME={$options->username}" . PHP_EOL .
                "DB_PASSWORD={$options->password}" . PHP_EOL .
                PHP_EOL;

            file_put_contents(base_path('.env'), $env);
        } catch (\Exception $e) {
            $this->error($e);
        }
    }
}
