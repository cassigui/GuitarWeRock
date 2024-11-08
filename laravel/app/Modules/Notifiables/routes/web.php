<?php

Route::get('notifiables/get', 'NotifiableController@get')             ->name('notifiables.get');
Route::get('notifiables/find', 'NotifiableController@find')           ->name('notifiables.find');
Route::get('notifiables/paginate', 'NotifiableController@paginate')   ->name('notifiables.paginate');
Route::put('notifiables/{id}/restore', 'NotifiableController@restore')->name('notifiables.restore');
Route::resource('notifiables', 'NotifiableController');                     //notifiables resource