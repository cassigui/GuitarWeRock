<?php

Route::get('customers/get', 'CustomerController@get')             ->name('customers.get');
Route::get('customers/find', 'CustomerController@find')           ->name('customers.find');
Route::get('customers/paginate', 'CustomerController@paginate')   ->name('customers.paginate');
Route::put('customers/{id}/restore', 'CustomerController@restore')->name('customers.restore');
Route::resource('customers', 'CustomerController');                     //customers resource