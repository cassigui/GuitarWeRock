<?php

namespace App\Modules\Contacts\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class ContactServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'wf.contacts');

        Route::middleware(['web', 'auth'])
            ->prefix('sistema')
            ->group(__DIR__ . '/../routes/web.php');

        Route::middleware(['api', 'jwt.auth', 'jwt.refresh'])
            ->prefix('api')
            ->group(__DIR__ . '/../routes/api.php');

        Relation::morphMap([
            'contacts' => 'App\Modules\Contacts\Contact',
        ]);
    }

    public function register()
    {
        $this->app->register(ContactEventServiceProvider::class);
        $this->app->register(ContactAuthServiceProvider::class);
    }
}
