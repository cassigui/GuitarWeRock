<?php

Route::get('postable-types/get', 'PostableTypeController@get')             ->name('postable-types.get');
Route::get('postable-types/find', 'PostableTypeController@find')           ->name('postable-types.find');
Route::get('postable-types/paginate', 'PostableTypeController@paginate')   ->name('postable-types.paginate');
Route::put('postable-types/{id}/restore', 'PostableTypeController@restore')->name('postable-types.restore');
Route::resource('postable-types', 'PostableTypeController');                     //postable-types resource