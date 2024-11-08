<?php

namespace App\Modules\Addressing\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Addressing\Countries\CountryService;

class CountryController extends Controller
{

    public function __construct(CountryService $country_service)
    {
        $this->country_service = $country_service;
    }

    public function find(Request $request)
    {
        return response()->json([
            'error'   => false, 
            'country' => $this->country_service->api->find($request->toArray())
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error'     => false, 
            'countries' => $this->country_service->api->get($request->toArray())
        ]);
    }
}
