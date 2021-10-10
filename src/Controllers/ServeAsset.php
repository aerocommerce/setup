<?php

namespace Aero\Setup\Controllers;

use Aero\Setup\CanPretendToBeAFile;

class ServeAsset
{
    use CanPretendToBeAFile;

    public function __invoke(string $file)
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
            case 'svg':
                $mime = 'image/svg+xml';
                break;
            default:
                abort(404);
        }

        return $this->pretendResponseIsFile($path, $mime);
    }
}
