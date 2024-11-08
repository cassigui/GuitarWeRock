<?php

namespace App\Modules\PostableTypes\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class PostableTypeServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'wf.postable_types');

        Route::middleware('web')
            //->middleware('auth')
            ->prefix('sistema')
            ->namespace('App\Modules\PostableTypes\Http\Controllers')
            ->group(__DIR__ . '/../routes/web.php');

        Route::middleware('api')
            //->middleware('auth')
            ->prefix('api')
            ->namespace('App\Modules\PostableTypes\Http\Controllers')
            ->group(__DIR__ . '/../routes/api.php');
    }

    public function register()
    {
        $this->app->register(PostableTypeEventServiceProvider::class);
        $this->app->register(PostableTypeAuthServiceProvider::class);
    }
}
