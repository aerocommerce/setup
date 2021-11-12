<?php

namespace Aero\Setup\Controllers\Actions;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TestElasticsearchConnection
{
    public function __invoke(Request $request): Response
    {
        $data = $request->validate([
            'host' => 'required',
            'port' => 'required',
        ]);

        $ch = curl_init();

        $url = "{$data['host']}:{$data['port']}";

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($ch);

        if (curl_errno($ch)) {
            return response([
                'message' => 'Could not connect to the Elasticsearch instance ('.curl_error($ch).').',
            ], 422);
        }

        curl_close($ch);

        $json = json_decode($result, true);

        $version = $json['version']['number'] ?? null;

        if (! $version || (int) $version !== 6) {
            return response([
                'message' => 'Incorrect version of Elasticsearch.',
            ], 422);
        }

        return response([
            'major_version' => (int) $version,
            'version' => $version,
        ]);
    }
}
