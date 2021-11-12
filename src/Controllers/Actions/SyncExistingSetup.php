<?php

namespace Aero\Setup\Controllers\Actions;

use Aero\Setup\Files;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class SyncExistingSetup
{
    public function __invoke(Request $request): Response
    {
        $file = Files::SETUP;

        abort_unless(Storage::exists($file), 404);

        $json = json_decode(Storage::get($file), true);

        return response($json['initial'] ?? '{}', 200, [
            'Content-Type' => 'application/json',
        ]);
    }
}
