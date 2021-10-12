<?php

namespace Aero\Setup\Controllers\Actions;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PingProgress
{
    public function __invoke(Request $request)
    {
        $json = json_decode(Storage::get('setup.json'), true);

        return response([
            'progress' => $json['progress'] ?? null,
            'message' => $json['currentJobMessage'] ?? null,
            'errors' => $json['errors'] ?? null,
        ]);
    }
}
