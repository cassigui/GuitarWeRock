<?php

use App\Modules\Customers\Http\Controllers\CustomerController;

Route::get('customers/get', [CustomerController::class, 'get']);
Route::get('customers/find', [CustomerController::class, 'find']);
Route::get('customers/paginate', [CustomerController::class, 'paginate']);
Route::put('customers/{id}/restore', [CustomerController::class, 'restore']);
Route::resource('customers', CustomerController::class);