<?php

namespace Aero\Setup;

use Illuminate\Support\Facades\Storage;

class Init
{
    public static function boot($initial = [])
    {
        $filesToRemove = [
            public_path('/robots.txt'),
            base_path('/resources/views/welcome.blade.php'),
        ];

        foreach ($filesToRemove as $file) {
            if (file_exists($file)) {
                unlink($file);
            }
        }

        $routesFilesToClear = [
            base_path('/routes/web.php'),
            base_path('/routes/api.php'),
        ];

        foreach ($routesFilesToClear as $path) {
            if (file_exists($path)) {
                $contents = file_get_contents($path);

                $contents = preg_replace('/(^Route::.*\;)/ms', '', $contents);

                file_put_contents($path, $contents);
            }
        }

        Storage::put(Files::SETUP, json_encode([
            'initial' => $initial,
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }
}
