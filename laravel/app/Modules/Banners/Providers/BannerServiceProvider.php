<?php

namespace App\Modules\Banners\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class BannerServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'wf.banners');

        Route::middleware('web')
            //->middleware('auth')
            ->prefix('sistema')
            ->namespace('App\Modules\Banners\Http\Controllers')
            ->group(__DIR__ . '/../routes/web.php');

        Route::middleware('api')
            //->middleware('auth')
            ->prefix('api')
            ->namespace('App\Modules\Banners\Http\Controllers')
            ->group(__DIR__ . '/../routes/api.php');

        Relation::morphMap([
            'banners' => 'App\Modules\Banners\Banner',
        ]);
    }

    public function register()
    {
        $this->app->register(BannerEventServiceProvider::class);
        $this->app->register(BannerAuthServiceProvider::class);
    }
}
