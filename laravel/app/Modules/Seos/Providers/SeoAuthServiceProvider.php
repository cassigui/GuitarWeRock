<?php

namespace App\Modules\Seos\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class SeoAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\Seos\Seo' => 'App\Modules\Seos\SeoPolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}
