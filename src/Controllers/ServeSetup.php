<?php

namespace Aero\Setup\Controllers;

use Illuminate\Http\Response;

class ServeSetup
{
    public function __invoke(): Response
    {
        $file = __DIR__.'/../../app/dist/index.html';

        abort_unless(file_exists($file), 404);

        return response(file_get_contents($file));
    }
}
