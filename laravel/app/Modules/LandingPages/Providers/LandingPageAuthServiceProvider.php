<?php

namespace App\Modules\LandingPages\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class LandingPageAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\LandingPages\LandingPage' => 'App\Modules\LandingPages\LandingPagePolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}
