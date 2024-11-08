<?php

namespace App\Modules\Addressing\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Addressing\States\StateService;

class StateController extends Controller
{

    public function __construct(StateService $state_service)
    {
        $this->state_service = $state_service;
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false, 
            'state' => $this->state_service->api->find($request->toArray())
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error'  => false, 
            'states' => $this->state_service->api->get($request->toArray())
        ]);
    }
}
