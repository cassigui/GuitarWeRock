<?php

namespace App\Modules\Contacts\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Contacts\Http\Requests\ContactRequest;
use App\Modules\Contacts\ContactService;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function __construct(ContactService $contact_service)
    {
        // $this->authorizeResource("App\Modules\Contacts\Contact", "App\Modules\Contacts\Contact");
        $this->contact_service = $contact_service;
    }

    public function store(ContactRequest $request)
    {
        return response()->json([
            'error' => false,
            'message' => __('wf.contacts::toasts.store'),
            'contact' => $this->contact_service->store($request->toArray()),
        ]);
    }

    public function update(ContactRequest $request, $id)
    {
        return response()->json([
            'error' => false,
            'message' => __('wf.contacts::toasts.update'),
            'contact' => $this->contact_service->update($request->toArray(), $id),
        ]);
    }

    public function destroy($id)
    {
        $this->contact_service->destroy($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.contacts::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->contact_service->restore($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.contacts::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error' => false,
            'contacts' => $this->contact_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'contact' => $this->contact_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->contact_service->api->paginate($request->toArray())
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
