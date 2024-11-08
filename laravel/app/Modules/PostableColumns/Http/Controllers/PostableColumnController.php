<?php

namespace App\Modules\PostableColumns\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\PostableColumns\Http\Requests\PostableColumnRequest;
use App\Modules\PostableColumns\PostableColumnService;
use Illuminate\Http\Request;

class PostableColumnController extends Controller
{
    public function __construct(PostableColumnService $postable_column_service)
    {
        // $this->authorizeResource("App\Modules\PostableColumns\PostableColumn", "App\Modules\PostableColumns\PostableColumn");
        $this->postable_column_service = $postable_column_service;
    }

    public function store(PostableColumnRequest $request)
    {
        return response()->json([
            'error' => false,
            'message' => __('wf.postable_columns::toasts.store'),
            'postable_column' => $this->postable_column_service->store($request->toArray()),
        ]);
    }

    public function update(PostableColumnRequest $request, $id)
    {
        return response()->json([
            'error' => false,
            'message' => __('wf.postable_columns::toasts.update'),
            'postable_column' => $this->postable_column_service->update($request->toArray(), $id),
        ]);
    }

    public function destroy($id)
    {
        $this->postable_column_service->destroy($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.postable_columns::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->postable_column_service->restore($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.postable_columns::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error' => false,
            'postable_columns' => $this->postable_column_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'postable_column' => $this->postable_column_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->postable_column_service->api->paginate($request->toArray())
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
