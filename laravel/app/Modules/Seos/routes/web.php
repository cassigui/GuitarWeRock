<?php

Route::get('seos/get', 'SeoController@get')             ->name('seos.get');
Route::get('seos/find', 'SeoController@find')           ->name('seos.find');
Route::get('seos/paginate', 'SeoController@paginate')   ->name('seos.paginate');
Route::put('seos/{id}/restore', 'SeoController@restore')->name('seos.restore');
Route::resource('seos', 'SeoController');                     //seos resource