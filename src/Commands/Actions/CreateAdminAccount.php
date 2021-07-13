<?php

namespace Aero\Setup\Commands\Actions;

use Aero\Admin\Models\Admin;

class CreateAdminAccount
{
    public function handle($options)
    {
        try {
            $admin = Admin::create([
                'name' => $options->name,
                'email' => $options->email,
                'password' => $options->password,
            ]);

            $admin->permissions = ['*'];

            $admin->save();
        } catch (\Exception $_) {
            return false;
        }

        return true;
    }
}
