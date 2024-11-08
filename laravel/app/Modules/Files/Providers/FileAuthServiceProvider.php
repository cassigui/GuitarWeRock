<?php

namespace App\Modules\Files\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class FileAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\Files\File' => 'App\Modules\Files\FilePolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}
