<?php

namespace App\Modules\PostableTypes\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\PostableTypes\Http\Requests\PostableTypeRequest;
use App\Modules\PostableTypes\PostableTypeService;
use Illuminate\Http\Request;

class PostableTypeController extends Controller
{
    public function __construct(PostableTypeService $postable_type_service)
    {
        // $this->authorizeResource("App\Modules\PostableTypes\PostableType", "App\Modules\PostableTypes\PostableType");
        $this->postable_type_service = $postable_type_service;
    }

    public function store(PostableTypeRequest $request)
    {
        return response()->json([
            'error' => false,
            'message' => __('wf.postable_types::toasts.store'),
            'postable_type' => $this->postable_type_service->store($request->toArray()),
        ]);
    }

    public function update(PostableTypeRequest $request, $id)
    {
        return response()->json([
            'error' => false,
            'message' => __('wf.postable_types::toasts.update'),
            'postable_type' => $this->postable_type_service->update($request->toArray(), $id),
        ]);
    }

    public function destroy($id)
    {
        $this->postable_type_service->destroy($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.postable_types::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->postable_type_service->restore($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.postable_types::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error' => false,
            'postable_types' => $this->postable_type_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'postable_type' => $this->postable_type_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->postable_type_service->api->paginate($request->toArray())
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
