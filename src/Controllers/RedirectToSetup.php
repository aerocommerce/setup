<?php

namespace Aero\Setup\Controllers;

use Illuminate\Http\RedirectResponse;

class RedirectToSetup
{
    public function __invoke(): RedirectResponse
    {
        return redirect()->route('aero.setup');
    }
}
