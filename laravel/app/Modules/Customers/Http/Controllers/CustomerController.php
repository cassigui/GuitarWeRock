<?php

namespace App\Modules\Customers\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Base\Utilities\UtilityService;
use App\Modules\Customers\Http\Requests\CustomerRequest;
use App\Modules\Customers\CustomerService;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function __construct(CustomerService $customer_service, UtilityService $utilityService)
    {
        // $this->authorizeResource("App\Modules\Customers\Customer", "App\Modules\Customers\Customer");
        $this->utility_service = $utilityService;
        $this->customer_service = $customer_service;
    }

    public function store(CustomerRequest $request)
    {
        $this->utility_service->verifyDOC($request->doc, ['third_parties','customers'], 'doc');
        return response()->json([
            'error' => false,
            'message' => __('wf.customers::toasts.store'),
            'customer' => $this->customer_service->store($request->toArray()),
        ]);
    }

    public function update(CustomerRequest $request, $id)
    {
        $this->utility_service->verifyDOC($request->doc, ['third_parties','customers'], 'doc', $id);
        return response()->json([
            'error' => false,
            'message' => __('wf.customers::toasts.update'),
            'customer' => $this->customer_service->update($request->toArray(), $id),
        ]);
    }

    public function destroy($id)
    {
        $this->customer_service->destroy($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.customers::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->customer_service->restore($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.customers::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error' => false,
            'customers' => $this->customer_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'customer' => $this->customer_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->customer_service->api->paginate($request->toArray())
        );
    }

    protected function resourceAbilityMap()
    {
        return array_merge(parent::resourceAbilityMap(), [
            'ngTableGet' => 'view',
            'restore' => 'restore',
        ]);
    }
}
