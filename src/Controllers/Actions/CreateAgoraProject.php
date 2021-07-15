<?php

namespace Aero\Setup\Controllers\Actions;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\RequestOptions;
use Illuminate\Http\Request;

class CreateAgoraProject
{
    public function __invoke(Request $request)
    {
        try {
            $data = $request->validate([
                'name' => 'required|string',
                'domain' => 'required|string',
                'token' => 'required|string',
            ]);
        } catch (\Exception $e) {
            return response(['success' => FALSE, 'error' => 'There was an issue processing the data!']);
        }

        $client = new Client();

        try {
            $response = $client->post('https://agora.aerocommerce.com/api/projects/create-project', [
                RequestOptions::HEADERS => [
                    'Authorization' => 'Bearer '.$data['token'],
                ],
                RequestOptions::VERIFY => false,
                RequestOptions::FORM_PARAMS => [
                    'name' => $data['name'],
                    'domain' => $data['domain'],
                ],
            ]);

            // Return project ID, name, token in the response for SelectProject.vue

            return response(['success' => true, 'data' => $response->getStatusCode()]);
        } catch (GuzzleException $e) {
            return response(['success' => false, 'error' => $e->getMessage()]);
        }
    }
}
