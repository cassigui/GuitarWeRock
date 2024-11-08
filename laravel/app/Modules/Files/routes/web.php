<?php

Route::get('files/get', 'FileController@get');
Route::get('files/find', 'FileController@find');
Route::get('files/paginate', 'FileController@paginate');

Route::put('files/{id}/restore', 'FileController@restore');
Route::put('files/remove-files', 'FileController@removeFiles');

Route::resource('files', 'FileController');
