<?php

namespace Aero\Setup\Controllers;

class RedirectToSetup
{
    public function __invoke()
    {
        return redirect()->route('aero.setup');
    }
}
