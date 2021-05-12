<?php

namespace Aero\Setup\Controllers;

class ServeSetup
{
    public function __invoke()
    {
        return file_get_contents(__DIR__.'/../../app/dist/index.html');
    }
}
