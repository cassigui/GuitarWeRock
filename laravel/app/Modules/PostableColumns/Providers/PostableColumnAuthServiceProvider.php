<?php

namespace App\Modules\PostableColumns\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class PostableColumnAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\PostableColumns\PostableColumn' => 'App\Modules\PostableColumns\PostableColumnPolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}
