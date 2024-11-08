<?php

namespace App\Modules\PostableSections\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class PostableSectionAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\PostableSections\PostableSection' => 'App\Modules\PostableSections\PostableSectionPolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}
