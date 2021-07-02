<?php

namespace Aero\Setup\Controllers\Actions;

use Illuminate\Http\Request;

class SaveUploadedImages
{
    public function __invoke(Request $request)
    {
        $name = $request->input('name');

        $file = $request->file('image')->storeAs("images", "{$name}.{$request->file('image')->extension()}");

        return ['success' => $file && $name];
    }
}
