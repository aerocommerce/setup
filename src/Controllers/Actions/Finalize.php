<?php

namespace Aero\Setup\Controllers\Actions;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class Finalize
{
    public function __invoke(Request $request)
    {
        try {
            $data = $request->validate([
                'jobs' => 'required|array',
            ]);
        } catch (\Throwable $_) {
            return ['success' => false];
        }

        Storage::put('data.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));



        return ['success' => true];
    }
}
