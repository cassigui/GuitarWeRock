<?php

namespace App\Modules\PostableColumns\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class PostableColumnServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'wf.postable_columns');

        Route::middleware('web')
        //->middleware('auth')
            ->prefix('sistema')
            ->namespace('App\Modules\PostableColumns\Http\Controllers')
            ->group(__DIR__ . '/../routes/web.php');

        Route::middleware('api')
        //->middleware('auth')
            ->prefix('api')
            ->namespace('App\Modules\PostableColumns\Http\Controllers')
            ->group(__DIR__ . '/../routes/api.php');

        Relation::morphMap([
            'postable_columns' => 'App\Modules\PostableColumns\PostableColumn',
        ]);
    }

    public function register()
    {
        $this->app->register(PostableColumnEventServiceProvider::class);
        $this->app->register(PostableColumnAuthServiceProvider::class);
    }
}
