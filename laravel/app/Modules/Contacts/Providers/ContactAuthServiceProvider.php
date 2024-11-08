<?php

namespace App\Modules\Contacts\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class ContactAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\Contacts\Contact' => 'App\Modules\Contacts\ContactPolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}
