<?php

namespace App\Modules\Contacts\Providers;

use App\Modules\Contacts\Contact;
use App\Modules\Contacts\ContactObserver;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class ContactEventServiceProvider extends ServiceProvider
{
    public function boot()
    {
        parent::boot();
    }

}
