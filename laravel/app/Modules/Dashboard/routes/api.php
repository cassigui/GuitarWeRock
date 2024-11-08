<?php
Route::group(['middleware' => ['api']], function () {
    Route::get('dashboard/get', 'DashboardController@get');
    Route::get('dashboard/dashboard-notification-queues', 'DashboardController@getNotificationQueue');
});
