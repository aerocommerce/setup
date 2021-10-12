<?php

namespace Aero\Setup\Commands;

use Aero\Admin\Models\Admin;
use Illuminate\Console\Command;

class CreateAdminCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'aero:setup:admin
                            {email : Admin email}
                            {password : Admin password}
                            {name : Admin name}
                            {--permissions=* : Admin permissions}';

    protected $description = 'Create an admin account';

    public function handle()
    {
        if (class_exists('Aero\Admin\Models\Admin')) {
            Admin::create([
                'email' => $this->argument('email'),
                'password' => $this->argument('password'),
                'name' => $this->argument('name'),
                'permissions' => $this->option('permissions') ? $this->option('permissions') : null,
            ]);

            $this->info('Admin user has been created!');
        } else {
            $this->error('The admin module is not installed.');
        }
    }
}
