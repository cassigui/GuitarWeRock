<?php

namespace App\Modules\PostableTypes\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class PostableTypeAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\PostableTypes\PostableType' => 'App\Modules\PostableTypes\PostableTypePolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}
