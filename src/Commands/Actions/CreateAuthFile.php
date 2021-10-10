<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\StoresErrors;
use Exception;

class CreateAuthFile
{
    use StoresErrors;

    public function handle($options): bool
    {
        try {
            file_put_contents(base_path('auth.json'), json_encode([
                'http-basic' => [
                    'agora.aerocommerce.com' => [
                        'username' => $options->user,
                        'password' => $options->pass,
                    ],
                ],
            ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        } catch(Exception $e) {
            $this->error($e);
        }

        return true;
    }
}
