<?php

Route::get('postable-sections/get', 'PostableSectionController@get')             ->name('postable-sections.get');
Route::get('postable-sections/find', 'PostableSectionController@find')           ->name('postable-sections.find');
Route::get('postable-sections/paginate', 'PostableSectionController@paginate')   ->name('postable-sections.paginate');
Route::put('postable-sections/{id}/restore', 'PostableSectionController@restore')->name('postable-sections.restore');
Route::resource('postable-sections', 'PostableSectionController');                     //postable-sections resource