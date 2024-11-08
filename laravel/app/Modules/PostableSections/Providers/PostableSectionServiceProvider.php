<?php

namespace App\Modules\PostableSections\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class PostableSectionServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'wf.postable_sections');

        Route::middleware('web')
            //->middleware('auth')
            ->prefix('sistema')
            ->namespace('App\Modules\PostableSections\Http\Controllers')
            ->group(__DIR__ . '/../routes/web.php');

        Route::middleware('api')
            //->middleware('auth')
            ->prefix('api')
            ->namespace('App\Modules\PostableSections\Http\Controllers')
            ->group(__DIR__ . '/../routes/api.php');
    }

    public function register()
    {
        $this->app->register(PostableSectionEventServiceProvider::class);
        $this->app->register(PostableSectionAuthServiceProvider::class);
    }
}
