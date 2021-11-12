<?php

namespace Aero\Setup\Commands\Traits;

use Aero\Setup\Files;
use Exception;
use Illuminate\Support\Facades\Storage;

trait StoresErrors
{
    protected function error(Exception $error): bool
    {
        $file = Files::SETUP;

        if (Storage::exists($file)) {
            if ($setup = json_decode(Storage::get($file), true)) {
                $setup['errors'] = $setup['errors'] ?? [];

                $setup['errors'][] = [
                    $error->getMessage(),
                ];

                Storage::put($file, json_encode($setup, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
            }
        }

        return false;
    }
}
