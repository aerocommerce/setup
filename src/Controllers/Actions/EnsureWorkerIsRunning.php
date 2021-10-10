<?php

namespace Aero\Setup\Controllers\Actions;

use Carbon\Carbon;
use Illuminate\Http\Request;

class EnsureWorkerIsRunning
{
    public function __invoke(Request $request)
    {
        $connected = false;

        if (file_exists($file = storage_path('app/worker.json'))) {
            $json = json_decode(file_get_contents($file));

            $connected = now()->subSeconds(5)
                ->lessThan(Carbon::createFromTimestamp($json->lastPinged));
        }

        return response([
           'connected' => $connected,
        ]);
    }
}
