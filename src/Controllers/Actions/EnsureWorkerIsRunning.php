<?php

namespace Aero\Setup\Controllers\Actions;

use Aero\Setup\Files;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class EnsureWorkerIsRunning
{
    public function __invoke(Request $request): Response
    {
        $connected = false;

        $file = Files::WORKER;

        if (Storage::exists($file)) {
            $json = json_decode(Storage::get($file));

            $connected = now()->subSeconds(5)
                ->lessThan(Carbon::createFromTimestamp($json->lastPinged));
        }

        return response([
            'connected' => $connected,
        ]);
    }
}
