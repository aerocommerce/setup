<?php

namespace Aero\Setup\Controllers\Actions;

use Aero\Setup\Files;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class PingProgress
{
    public function __invoke(Request $request): Response
    {
        $file = Files::SETUP;

        abort_unless(Storage::exists($file), 404);

        $json = json_decode(Storage::get($file), true);

        return response([
            'progress' => $json['progress'] ?? null,
            'message' => $json['currentJobMessage'] ?? null,
            'errors' => $json['errors'] ?? [],
        ]);
    }
}
