<?php

namespace App\Modules\Addressing\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Addressing\Cities\CityService;
use App\Modules\Addressing\Http\Requests\CityRequest;
use Illuminate\Http\Request;

class CityController extends Controller
{

    public function __construct(CityService $city_service)
    {
        $this->city_service = $city_service;
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'city'  => $this->city_service->api->find($request->toArray()),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error'  => false,
            'cities' => $this->city_service->api->get($request->toArray()),
        ]);
    }

    public function update(CityRequest $request, $id)
    {
        return response()->json([
            'error'   => false,
            'message' => __('wf.addressing::toasts.addresses.update'),
            'city'    => $this->city_service->update($request->toArray(), $id),
        ]);
    }

}
