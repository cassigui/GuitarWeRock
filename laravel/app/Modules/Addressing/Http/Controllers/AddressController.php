<?php

namespace App\Modules\Addressing\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Addressing\Addresses\AddressService;
use Illuminate\Http\Request;

class AddressController extends Controller
{

    public function __construct(AddressService $address_service)
    {
        $this->address_service = $address_service;
    }

    public function find(Request $request)
    {
        return response()->json([
            'error'   => false,
            'address' => $this->address_service->api->find($request->toArray()),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error'     => false,
            'addresses' => $this->address_service->api->get($request->toArray()),
        ]);
    }

    public function destroy($id)
    {
        $this->address_service->destroyById($id);

        return response()->json([
            'error'   => false,
            'message' => __('wf.addressing::toasts.addresses.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->address_service->restore($id);

        return response()->json([
            'error'   => false,
            'message' => __('wf.addressing::toasts.addresses.restore'),
        ]);
    }
}
