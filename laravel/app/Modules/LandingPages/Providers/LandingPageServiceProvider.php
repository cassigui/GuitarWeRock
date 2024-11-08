<?php

namespace App\Modules\LandingPages\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class LandingPageServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'wf.landing_pages');

        Route::middleware('web')
        //->middleware('auth')
            ->prefix('sistema')
            ->namespace('App\Modules\LandingPages\Http\Controllers')
            ->group(__DIR__ . '/../routes/web.php');

        Route::middleware('api')
        //->middleware('auth')
            ->prefix('api')
            ->namespace('App\Modules\LandingPages\Http\Controllers')
            ->group(__DIR__ . '/../routes/api.php');

        Relation::morphMap([
            'landing_pages' => 'App\Modules\LandingPages\LandingPage',
        ]);
    }

    public function register()
    {
        $this->app->register(LandingPageEventServiceProvider::class);
        $this->app->register(LandingPageAuthServiceProvider::class);
    }
}
