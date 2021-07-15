<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\StoresErrors;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\RequestOptions;

class CreateProject
{
    use StoresErrors;

    public function handle($options): bool
    {
        $client = new Client();

        try {
            $response = $client->post('https://agora.aerocommerce.com/api/projects/create-project', [
                RequestOptions::HEADERS => [
                    'Authorization' => 'Bearer '.$options->token,
                ],
                RequestOptions::VERIFY => false,
                RequestOptions::FORM_PARAMS => [
                    'name' => $options->name,
                    'domain' => $options->domain,
                ]
            ]);

            $data = json_decode($response->getBody(), true);

            if (! ($token = $data['token'] ?? null)) {
                return false;
            }

            [$username, $password] = explode(':', base64_decode($token));

            return app(CreateAuthFile::class)->handle((object) [
                'user' => $username,
                'pass' => $password,
            ]);
        } catch (GuzzleException $e) {
            $this->error($e);
        }

        return false;
    }
}
