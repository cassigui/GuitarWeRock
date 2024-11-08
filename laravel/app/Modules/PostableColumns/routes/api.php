<?php

Route::get('postable-columns/get', 'PostableColumnController@get')             ->name('postable-columns.get');
Route::get('postable-columns/find', 'PostableColumnController@find')           ->name('postable-columns.find');
Route::get('postable-columns/paginate', 'PostableColumnController@paginate')   ->name('postable-columns.paginate');
Route::put('postable-columns/{id}/restore', 'PostableColumnController@restore')->name('postable-columns.restore');
Route::resource('postable-columns', 'PostableColumnController');                     //postable-columns resource