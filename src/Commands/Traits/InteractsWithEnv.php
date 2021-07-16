<?php

namespace Aero\Setup\Commands\Traits;

use Illuminate\Support\Str;

trait InteractsWithEnv
{
    protected function setEnvValue($key, $value): void
    {
        if (! empty($value) && ! is_numeric($value) && preg_match('/\s/', $value)) {
            $value = '"'.addslashes($value).'"';
        }

        $file = base_path('.env');

        $env = file_get_contents($file);

        if (Str::contains($env, ["{$key}="])) {
            $env = preg_replace("/^{$key}=.*$/m", "{$key}={$value}", $env);
        } else {
            $env .= PHP_EOL."{$key}={$value}".PHP_EOL;
        }

        file_put_contents($file, $env);
    }
}
