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
                        'username' => $options->user,
                        'password' => $options->pass,
                    ],
                ],
            ], JSON_PRETTY_PRINT));
        } catch(\Exception $_) {
            return false;
        }

        return true;
    }
}
