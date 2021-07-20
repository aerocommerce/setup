<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Common\Settings\Setting;
use Aero\Setup\Commands\Traits\StoresErrors;
use Aero\Setup\Commands\Traits\UsesCommandLine;
use Illuminate\Database\DatabaseManager;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;

class CreateStoreConfig
{
    use UsesCommandLine, StoresErrors;

    public function handle($options)
    {
        try {
            if (file_exists(config_path('aero/store.php'))) {
                File::delete(config_path('aero/store.php'));
            }

            $json = json_encode([
                'default' => 'en_GB',
                'en_GB' => [
                    'type' => 'root',
                    'name' => env('APP_NAME'),
                    'language' => $options->store_language ?? 'en',
                    'fallback_language' => 'en',
                    'customer_tax_group_id' => 1,
                    'country' => $options->store_country ?? 'GB',
                    'locale' => 'en_GB',
                    'currency_code' => $options->store_currency ?? 'GBP',
                    'address' => [
                        'country' => $options->country,
                        'line_1' => $options->line_1,
                        'line_2' => $options->line_2,
                        'city' => $options->city,
                        'post_code' => $options->post_code,
                        'phone' => $options->phone,
                        'tax_id' => $options->tax_id,
                    ]
                ],
            ], JSON_PRETTY_PRINT);

            $json = str_replace('{', '[', $json);
            $json = str_replace(':', ' =>', $json);
            $json = str_replace('}', ']', $json);
            $json = str_replace('"', "'", $json);

            if (! File::isDirectory(config_path('aero'))) {
                File::makeDirectory(config_path('aero'));
            }

            file_put_contents(config_path('aero/store.php'),
            "<?php" . PHP_EOL . PHP_EOL .
                 "return " . $json . ';'
            );
        } catch (\Exception $e) {
            dd($e);
        }

        return true;
    }
}
