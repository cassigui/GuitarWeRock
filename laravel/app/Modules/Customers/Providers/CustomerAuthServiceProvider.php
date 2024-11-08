<?php

namespace App\Modules\Customers\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class CustomerAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\Customers\Customer' => 'App\Modules\Customers\CustomerPolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}
