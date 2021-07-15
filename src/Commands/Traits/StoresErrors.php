<?php

namespace Aero\Setup\Commands\Traits;


trait StoresErrors
{
    protected function error(string $message): void
    {
        if (file_exists(storage_path('app/setup.json'))) {
            if ($setup = json_decode(file_get_contents(storage_path('app/setup.json')))) {
                $setup->errors[] = [
                    $message,
                ];

                file_put_contents(storage_path('app/setup.json'), json_encode($setup, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            }
        }
    }
}
