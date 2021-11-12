<?php

namespace Aero\Setup\Controllers\Actions;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SaveUploadedImages
{
    public function __invoke(Request $request): Response
    {
        try {
            foreach ($request->files->all() as $key => $_) {
                $file = $request->file($key);
                $file->storeAs('', "{$key}.{$file->extension()}");
            }
        } catch (Exception $_) {
            return response(['success' => false]);
        }

        return response(['success' => true]);
    }
}
