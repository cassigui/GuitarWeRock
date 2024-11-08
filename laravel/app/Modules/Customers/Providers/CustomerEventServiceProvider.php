<?php

namespace App\Modules\Customers\Providers;

use App\Modules\Customers\Customer;
use App\Modules\Customers\CustomerObserver;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class CustomerEventServiceProvider extends ServiceProvider
{
    public function boot()
    {
        parent::boot();
    }

}
