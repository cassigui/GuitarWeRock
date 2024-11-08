<?php

Route::get('contacts/get', 'ContactController@get')             ->name('contacts.get');
Route::get('contacts/find', 'ContactController@find')           ->name('contacts.find');
Route::get('contacts/paginate', 'ContactController@paginate')   ->name('contacts.paginate');
Route::put('contacts/{id}/restore', 'ContactController@restore')->name('contacts.restore');
Route::resource('contacts', 'ContactController');                     //contacts resource