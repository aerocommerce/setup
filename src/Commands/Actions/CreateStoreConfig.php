<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Setup\Commands\Traits\StoresErrors;
use Aero\Setup\Commands\Traits\UsesCommandLine;
use Exception;
use Illuminate\Support\Facades\File;

class CreateStoreConfig
{
    use UsesCommandLine, StoresErrors;

    public function handle($options)
    {
        try {
            $file = config_path('aero/store.php');

            if (File::exists($file)) {
                File::delete($file);
            }

            $config = <<<'TXT'
<?php

return [
    'default' => '{default}',

    'configurations' => [
        '{default}' => [
            'type' => 'root',
            'name' => '{app_name}',
            'language' => '{language}',
            'fallback_language' => 'en',
            'customer_tax_group_id' => 1,
            'country' => '{store_country}',
            'locale' => '{store_locale}',
            'currency_code' => '{store_currency}',
            'address' => [
                'country' => '{country}',
                'line_1' => '{line_1}',
                'line_2' => '{line_2}',
                'city' => '{city}',
                'post_code' => '{post_code}',
                'phone' => '{phone}',
                'tax_id' => '{tax_id}'
            ]
        ]
    ]
];
TXT;

            $map = [
                '{default}' => $options->store_key ?? 'english',
                '{app_name}' => env('APP_NAME'),
                '{language}' => $options->store_language ?? 'en',
                '{store_country}' => $options->store_country ?? 'GB',
                '{store_currency}' => $options->store_currency ?? 'GBP',
                '{store_locale}' => $options->store_locale ?? 'en_GB',
                '{country}' => $options->country,
                '{line_1}' => $options->line_1,
                '{line_2}' => $options->line_2,
                '{city}' => $options->city,
                '{post_code}' => $options->post_code,
                '{phone}' => $options->phone,
                '{tax_id}' => $options->tax_id,
            ];

            foreach ($map as $key => $replacement) {
                $config = str_replace($key, $replacement, $config);
            }

            if (! File::isDirectory($directory = config_path('aero'))) {
                File::makeDirectory($directory);
            }

            File::put($file, $config);
        } catch (Exception $e) {
            $this->error($e);
        }
    }
}
