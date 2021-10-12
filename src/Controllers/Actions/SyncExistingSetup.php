<?php

namespace Aero\Setup\Controllers\Actions;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SyncExistingSetup
{
    public function __invoke(Request $request)
    {
        $json = json_decode(Storage::get('setup.json'), true);

        if (! isset($json['initial'])) {
            return response('{}');
        }

        return response($json['initial']);
    }
}
