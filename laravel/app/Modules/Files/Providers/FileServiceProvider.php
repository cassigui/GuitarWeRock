<?php

namespace App\Modules\Files\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class FileServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'wf.files');

        Route::middleware('web')
            //->middleware('auth')
            ->prefix('sistema')
            ->namespace('App\Modules\Files\Http\Controllers')
            ->group(__DIR__ . '/../routes/web.php');

        Route::middleware(['api', 'jwt.auth'])
            //->middleware('auth')
            ->prefix('api')
            ->namespace('App\Modules\Files\Http\Controllers')
            ->group(__DIR__ . '/../routes/api.php');
        Relation::morphMap([
            'files' => 'App\Modules\Files\file',
        ]);
    }

    public function register()
    {
        $this->app->register(FileEventServiceProvider::class);
        $this->app->register(FileAuthServiceProvider::class);
    }
}
