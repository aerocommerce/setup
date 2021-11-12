<?php

namespace Aero\Setup\Controllers;

use Illuminate\Http\Response;

class ServeOptionsHeaders
{
    public function __invoke(): Response
    {
        return response('');
    }
}
