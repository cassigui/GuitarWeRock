<?php

namespace App\Modules\Customers\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class CustomerServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'wf.customers');

        Route::middleware(['web', 'auth'])
            ->prefix('sistema')
            ->group(__DIR__ . '/../routes/web.php');

        Route::middleware(['api', 'jwt.auth', 'jwt.refresh'])
            ->prefix('api')
            ->group(__DIR__ . '/../routes/api.php');

        Relation::morphMap([
            'customers' => 'App\Modules\Customers\Customer',
        ]);
    }

    public function register()
    {
        $this->app->register(CustomerEventServiceProvider::class);
        $this->app->register(CustomerAuthServiceProvider::class);
    }
}
