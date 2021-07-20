<?php

namespace Aero\Setup\Controllers\Actions;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PingProgress
{
    public function __invoke(Request $request)
    {
        $json = json_decode(file_get_contents(storage_path('app/setup.json')));

        return response([
           'progress' => isset($json->progress) ? $json->progress : null,
           'message' => isset($json->currentJobMessage) ? $json->currentJobMessage : null,
           'errors' => isset($json->errors) ? $json->errors : null,
        ]);
    }
}
