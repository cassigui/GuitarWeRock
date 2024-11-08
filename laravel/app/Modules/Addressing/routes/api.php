<?php

Route::get('addresses/find', 'AddressController@find')->name('addresses.find');
Route::get('addresses/get', 'AddressController@get')->name('addresses.get');
Route::delete('addresses/{id}', 'AddressController@destroy')->name('addresses.destroy');
Route::put('addresses/{id}/restore', 'AddressController@restore')->name('addresses.restore');

Route::get('cities/find', 'CityController@find')->name('cities.find');
Route::get('cities/get', 'CityController@get')->name('cities.get');
Route::resource('cities', 'CityController'); //generation-factors resource

Route::get('states/find', 'StateController@find')->name('states.find');
Route::get('states/get', 'StateController@get')->name('states.get');

Route::get('countries/find', 'CountryController@find')->name('countries.find');
Route::get('countries/get', 'CountryController@get')->name('countries.get');
