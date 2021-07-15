<?php

namespace Aero\Setup\Commands\Actions;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\RequestOptions;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class CreateAuthFile
{
    public function handle($options): bool
    {
        try {
            File::put(base_path('auth.json'), json_encode([
                'http-basic' => [
                    'agora.aerocommerce.com' => [
                        'username' => 'bhHX5pJdAXTuOjuguAj16iqbJWHw14WmFWpylu8M',
                        'password' => 'tInvCNpjk0B4rGVCd3962G5s29lEGNJT87DlYVSnqxkVsqnXD1271DCt7QK2',
                    ],
                ],
            ], JSON_PRETTY_PRINT));
        } catch(\Exception $_) {
            return false;
        }

        return true;
    }
}
