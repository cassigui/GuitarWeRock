<?php

namespace App\Modules\Files\Providers;

use App\Modules\Files\File;
use App\Modules\Files\FileObserver;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class FileEventServiceProvider extends ServiceProvider
{
    public function boot()
    {
        parent::boot();
        // File::observe(FileObserver::class);
    }
}
