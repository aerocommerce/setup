<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\StoresErrors;
use Exception;

class CreateAuthFile
{
    use StoresErrors;

    public function handle($options)
    {
        [$username, $password] = explode(':', base64_decode($options->token));

        try {
            file_put_contents(base_path('auth.json'), json_encode([
                'http-basic' => [
                    'agora.aerocommerce.com' => [
                        'username' => $username,
                        'password' => $password,
                    ],
                ],
            ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        } catch (Exception $e) {
            $this->error($e);
        }
    }
}
