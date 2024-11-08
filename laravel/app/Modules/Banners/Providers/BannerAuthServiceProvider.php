<?php

namespace App\Modules\Banners\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class BannerAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\Banners\Banner' => 'App\Modules\Banners\BannerPolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}
