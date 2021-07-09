<?php

namespace Aero\Setup\Commands\Actions;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\RequestOptions;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class InstallDependencies
{
    public function handle($options): bool
    {
        Artisan::call('install');

        Artisan::call('migrate');
    }
}
