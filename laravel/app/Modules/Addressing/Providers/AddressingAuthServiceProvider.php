<?php

namespace App\Modules\Addressing\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class AddressingAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        //
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}
