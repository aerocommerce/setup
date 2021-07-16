<?php

namespace Aero\Setup\Commands\Actions;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CopyLogoImages
{
    public function handle($options)
    {
        if (Storage::exists('images')) {
            $files = Storage::allFiles('images');

            foreach ($files as $file) {
                if (Str::contains($file, 'email-logo')
                    || Str::contains($file, 'store-logo')) {
                    if (Str::contains($file, '.svg')) {
                        File::move(storage_path("app/{$file}"), base_path("themes/{$options->theme}/logo.svg"));

                        continue;
                    }

                    File::move(storage_path("app/{$file}"), public_path('logo.png'));
                }
            }
        }
    }
}
