<?php

Route::get('landing-pages/get', 'LandingPageController@get')             ->name('landing-pages.get');
Route::get('landing-pages/find', 'LandingPageController@find')           ->name('landing-pages.find');
Route::get('landing-pages/paginate', 'LandingPageController@paginate')   ->name('landing-pages.paginate');
Route::put('landing-pages/{id}/restore', 'LandingPageController@restore')->name('landing-pages.restore');
Route::put('landing-pages/reorder', 'LandingPageController@reorder')     ->name('landing-pages.reorder');
Route::resource('landing-pages', 'LandingPageController');                     //landing-pages resource