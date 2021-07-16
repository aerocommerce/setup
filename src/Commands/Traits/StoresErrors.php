<?php

namespace Aero\Setup\Commands\Traits;

trait StoresErrors
{
    protected function error(string $message): void
    {
        if (file_exists($file = storage_path('app/setup.json'))) {
            if ($setup = json_decode(file_get_contents($file))) {
                $setup->errors[] = [
                    $message,
                ];

                file_put_contents($file, json_encode($setup, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            }
        }
    }
}
