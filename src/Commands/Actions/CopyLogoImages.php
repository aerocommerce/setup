<?php

namespace Aero\Setup\Commands\Actions;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CopyLogoImages
{
    public function handle($options)
    {
        if (File::exists($file = storage_path("app/store.svg"))) {
            File::move($file, public_path("logo.svg"));
        }

        if (File::exists($file = storage_path("app/email.png"))) {
            File::move($file, public_path("logo.png"));
        }
    }
}
