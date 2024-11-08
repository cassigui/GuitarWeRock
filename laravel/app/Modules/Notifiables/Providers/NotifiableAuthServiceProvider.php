<?php

namespace App\Modules\Notifiables\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider;

class NotifiableAuthServiceProvider extends AuthServiceProvider
{
    protected $policies = [
        'App\Modules\Notifiables\Notifiable' => 'App\Modules\Notifiables\NotifiablePolicy',
    ];
    
    public function register()
    {
        $this->registerPolicies();
    }
}
