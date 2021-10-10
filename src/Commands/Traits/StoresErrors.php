<?php

namespace Aero\Setup\Commands\Traits;

use Exception;

trait StoresErrors
{
    protected function error(Exception $error): bool
    {
        if (file_exists($file = storage_path('app/setup.json'))) {
            if ($setup = json_decode(file_get_contents($file))) {
                if (! isset($setup->errors)) {
                    $setup->errors = [];
                }

                $setup->errors[] = [
                    $error->getMessage(),
                ];

                file_put_contents($file, json_encode($setup, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            }
        }

        return false;
    }
}
