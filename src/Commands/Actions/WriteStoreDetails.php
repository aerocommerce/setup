<?php

namespace Aero\Setup\Commands\Actions;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class WriteStoreDetails
{
    public function handle($options)
    {
        if (file_exists(base_path('.env'))) {
            File::delete(base_path('.env'));
        }

        $env = "APP_NAME={$options->name}" . PHP_EOL .
               "APP_ENV=local" . PHP_EOL .
               "APP_KEY=" . PHP_EOL .
               "APP_DEBUG=true" . PHP_EOL .
               "APP_URL={$options->host}" . PHP_EOL .
               PHP_EOL .
               "LOG_CHANNEL=stack" . PHP_EOL .
               PHP_EOL;

        file_put_contents(base_path('.env'), $env);
    }
}
