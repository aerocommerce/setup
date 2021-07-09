<?php

namespace Aero\Setup\Commands\Actions;


class CreateStoreConfig
{
    public function handle($options)
    {
        $env = file_get_contents(base_path('.env'));

        $env .= "BROADCAST_DRIVER=log" . PHP_EOL .
                "CACHE_DRIVER=file" . PHP_EOL .
                "QUEUE_CONNECTION=database" . PHP_EOL .
                "SESSION_DRIVER=file" . PHP_EOL .
                "SESSION_LIFETIME=120" . PHP_EOL .
                PHP_EOL;

        $env .= "REDIS_HOST=127.0.0.1" . PHP_EOL .
                "REDIS_PASSWORD=null" . PHP_EOL .
                "REDIS_PORT=6379" . PHP_EOL .
                PHP_EOL;

        $env .= "MAIL_DRIVER=smtp" . PHP_EOL .
                "MAIL_HOST=smtp.mailtrap.io" . PHP_EOL .
                "MAIL_PORT=2525" . PHP_EOL .
                "MAIL_USERNAME=null" . PHP_EOL .
                "MAIL_PASSWORD=null" . PHP_EOL .
                "MAIL_ENCRYPTION=null" . PHP_EOL .
                "MAIL_FROM_ADDRESS=null" . PHP_EOL .
                "MAIL_FROM_NAME=\"\${APP_NAME}\"" . PHP_EOL .
                PHP_EOL;

        $env .= "AWS_ACCESS_KEY_ID=" . PHP_EOL .
                "AWS_SECRET_ACCESS_KEY=" . PHP_EOL .
                "AWS_DEFAULT_REGION=us-east-1" . PHP_EOL .
                "AWS_BUCKET=" . PHP_EOL .
                PHP_EOL;

        $env .= "PUSHER_APP_ID=" . PHP_EOL .
                "PUSHER_APP_KEY=" . PHP_EOL .
                "PUSHER_APP_SECRET=" . PHP_EOL .
                "PUSHER_APP_CLUSTER=mt1" . PHP_EOL .
                PHP_EOL;

        $env .= "MIX_PUSHER_APP_KEY=\"\${PUSHER_APP_KEY}\"" . PHP_EOL .
                "MIX_PUSHER_APP_CLUSTER=\"\${PUSHER_APP_CLUSTER}\"" . PHP_EOL .
                PHP_EOL;

        file_put_contents(base_path('.env'), $env);
    }
}
