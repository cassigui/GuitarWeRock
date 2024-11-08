<?php

namespace App\Modules\Dashboard\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Dashboard\DashboardService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function get(Request $request, DashboardService $dashboard_service)
    {
        return response()->json([
            'error'     => false,
            'message'   => 'Dashboard',
            'dashboard' => $dashboard_service->get($request->toArray()),
        ]);
    }

    public function getNotificationQueue(Request $request, DashboardService $dashboard_service)
    {   
        return response()->json([
            'error'     => false,
            'message'   => 'Dashboard',
            'notifications' => $dashboard_service->getNotificationQueue($request->toArray()),
        ]);
    }
}
