<?php

use App\Modules\Contacts\Http\Controllers\ContactController;

Route::get('contacts/get', [ContactController::class, 'get']);
Route::get('contacts/find', [ContactController::class, 'find']);
Route::get('contacts/paginate', [ContactController::class, 'paginate']);
Route::put('contacts/{id}/restore', [ContactController::class, 'restore']);
Route::resource('contacts', ContactController::class);