<?php

namespace App\Modules\Notifiables\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class NotifiableServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'wf.notifiables');

        Route::middleware(['web', 'auth'])
            ->prefix('sistema')
            ->group(__DIR__ . '/../routes/web.php');

        Route::middleware(['api', 'jwt.auth', 'jwt.refresh'])
            ->prefix('api')
            ->group(__DIR__ . '/../routes/api.php');

        Relation::morphMap([
            'notifiables' => 'App\Modules\Notifiables\Notifiable',
        ]);
    }

    public function register()
    {
        $this->app->register(NotifiableEventServiceProvider::class);
        $this->app->register(NotifiableAuthServiceProvider::class);
    }
}
