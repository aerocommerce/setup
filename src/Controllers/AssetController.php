<?php

namespace Aero\Setup\Controllers;

use Aero\Setup\CanPretendToBeAFile;

class AssetController
{
    use CanPretendToBeAFile;
    
    public function file(string $file)
    {
        $path = __DIR__.'/../../app/dist/assets/'.$file;

        abort_unless(file_exists($path), 404);

        switch (pathinfo(strtolower($file), PATHINFO_EXTENSION)) {
            case 'css':
                $mime = 'text/css';
                break;
            case 'js':
                $mime = 'application/javascript';
                break;
            case 'png':
                $mime = 'image/png';
                break;
            default:
                abort(404);
        }

        return $this->pretendResponseIsFile($path, $mime);
    }
}
