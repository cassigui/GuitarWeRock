<?php

use App\Modules\Notifiables\Http\Controllers\NotifiableController;

Route::get('notifiables/get', [NotifiableController::class, 'get']);
Route::get('notifiables/find', [NotifiableController::class, 'find']);
Route::get('notifiables/paginate', [NotifiableController::class, 'paginate']);
Route::put('notifiables/{id}/restore', [NotifiableController::class, 'restore']);
Route::resource('notifiables', NotifiableController::class);