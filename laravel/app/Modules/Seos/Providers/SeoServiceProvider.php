<?php

namespace App\Modules\Seos\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;

class SeoServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'wf.seos');

        Route::middleware('web')
            //->middleware('auth')
            ->prefix('sistema')
            ->namespace('App\Modules\Seos\Http\Controllers')
            ->group(__DIR__ . '/../routes/web.php');

        Route::middleware('api')
            //->middleware('auth')
            ->prefix('api')
            ->namespace('App\Modules\Seos\Http\Controllers')
            ->group(__DIR__ . '/../routes/api.php');

        Relation::morphMap([
            'seos' => 'App\Modules\Seos\Seo',
        ]);
    }

    public function register()
    {
        $this->app->register(SeoEventServiceProvider::class);
        $this->app->register(SeoAuthServiceProvider::class);
    }
}
