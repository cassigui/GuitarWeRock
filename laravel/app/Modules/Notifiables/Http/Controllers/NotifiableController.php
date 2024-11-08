<?php

namespace App\Modules\Notifiables\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Notifiables\Http\Requests\NotifiableRequest;
use App\Modules\Notifiables\NotifiableService;
use Illuminate\Http\Request;

class NotifiableController extends Controller
{
    public function __construct(NotifiableService $notifiable_service)
    {
        // $this->authorizeResource("App\Modules\Notifiables\Notifiable", "App\Modules\Notifiables\Notifiable");
        $this->notifiable_service = $notifiable_service;
    }

    public function store(NotifiableRequest $request)
    {
        return response()->json([
            'error' => false,
            'message' => __('wf.notifiables::toasts.store'),
            'notifiable' => $this->notifiable_service->store($request->toArray()),
        ]);
    }

    public function update(NotifiableRequest $request, $id)
    {
        return response()->json([
            'error' => false,
            'message' => __('wf.notifiables::toasts.update'),
            'notifiable' => $this->notifiable_service->update($request->toArray(), $id),
        ]);
    }

    public function destroy($id)
    {
        $this->notifiable_service->destroy($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.notifiables::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->notifiable_service->restore($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.notifiables::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error' => false,
            'notifiables' => $this->notifiable_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'notifiable' => $this->notifiable_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->notifiable_service->api->paginate($request->toArray())
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
