<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\StoresErrors;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\RequestOptions;

class CreateProject
{
    use StoresErrors;

    protected $authAction;

    public function __construct(CreateAuthFile $authAction)
    {
        $this->authAction = $authAction;
    }

    public function handle($options)
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
                ],
            ]);

            $data = json_decode($response->getBody(), true);

            if (! ($token = $data['token'] ?? null)) {
                return;
            }

            $this->authAction->handle((object) [
                'token' => $token,
            ]);
        } catch (GuzzleException $e) {
            $this->error($e);
        }
    }
}
