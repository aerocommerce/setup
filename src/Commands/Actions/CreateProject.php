<?php

namespace Aero\Setup\Commands\Actions;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\RequestOptions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class CreateProject
{
    public function handle($options): bool
    {
        $client = new Client();

        try {
            $client->post('https://agora.test/api/projects/create-project', [
                RequestOptions::HEADERS => [
                    'Authorization' => 'Bearer '.$options->auth,
                ],
                RequestOptions::VERIFY => false,
                RequestOptions::FORM_PARAMS => [
                    'name' => $options->name,
                    'domain' => $options->domain,
                ]
            ]);
        } catch (GuzzleException $e) {
            return false;
        }

        return true;
    }
}
