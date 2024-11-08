<?php

namespace App\Modules\Addressing\Providers;

use App\Modules\Addressing\Providers\AddressingAuthServiceProvider;
use App\Modules\Addressing\Providers\AddressingEventServiceProvider;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AddressingServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(__DIR__ . '/../resources/lang', 'wf.addressing');

        Route::middleware('web')
            ->prefix('web')
            ->namespace('App\Modules\Addressing\Http\Controllers')
            ->group(__DIR__ . '/../routes/web.php');

        Route::middleware(['api', 'jwt.auth'])
            ->prefix('api')
            ->namespace('App\Modules\Addressing\Http\Controllers')
            ->group(__DIR__ . '/../routes/api.php');
    }

    public function register()
    {
        $this->app->register(AddressingEventServiceProvider::class);
        $this->app->register(AddressingAuthServiceProvider::class);
    }
}
