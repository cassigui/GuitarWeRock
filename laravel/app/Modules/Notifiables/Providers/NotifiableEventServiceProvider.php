<?php

namespace App\Modules\Notifiables\Providers;

use App\Modules\Notifiables\Notifiable;
use App\Modules\Notifiables\NotifiableObserver;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class NotifiableEventServiceProvider extends ServiceProvider
{
    public function boot()
    {
        parent::boot();
    }

}
