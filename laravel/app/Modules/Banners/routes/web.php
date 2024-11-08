<?php

Route::get('banners/get', 'BannerController@get')             ->name('banners.get');
Route::get('banners/find', 'BannerController@find')           ->name('banners.find');
Route::get('banners/paginate', 'BannerController@paginate')   ->name('banners.paginate');
Route::put('banners/{id}/restore', 'BannerController@restore')->name('banners.restore');
Route::resource('banners', 'BannerController');                     //banners resource