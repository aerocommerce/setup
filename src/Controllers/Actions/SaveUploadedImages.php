<?php

namespace Aero\Setup\Controllers\Actions;

use Illuminate\Http\Request;

class SaveUploadedImages
{
    public function __invoke(Request $request)
    {
        try {
            foreach ($request->files->all() as $key => $_) {
                $file = $request->file($key);
                $file->storeAs('', "{$key}.{$file->extension()}");
            }
        } catch (\Exception $e) {
            return ['success' => false];
        }

        return ['success' => true];
    }
}
