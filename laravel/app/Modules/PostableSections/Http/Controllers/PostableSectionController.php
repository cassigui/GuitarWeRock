<?php

namespace App\Modules\PostableSections\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\PostableSections\Http\Requests\PostableSectionRequest;
use App\Modules\PostableSections\PostableSectionService;
use Illuminate\Http\Request;

class PostableSectionController extends Controller
{
    public function __construct(PostableSectionService $postable_section_service)
    {
        // $this->authorizeResource("App\Modules\PostableSections\PostableSection", "App\Modules\PostableSections\PostableSection");
        $this->postable_section_service = $postable_section_service;
    }

    public function store(PostableSectionRequest $request)
    {
        return response()->json([
            'error' => false,
            'message' => __('wf.postable_sections::toasts.store'),
            'postable_section' => $this->postable_section_service->store($request->toArray()),
        ]);
    }

    public function update(PostableSectionRequest $request, $id)
    {
        return response()->json([
            'error' => false,
            'message' => __('wf.postable_sections::toasts.update'),
            'postable_section' => $this->postable_section_service->update($request->toArray(), $id),
        ]);
    }

    public function destroy($id)
    {
        $this->postable_section_service->destroy($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.postable_sections::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->postable_section_service->restore($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.postable_sections::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error' => false,
            'postable_sections' => $this->postable_section_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'postable_section' => $this->postable_section_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->postable_section_service->api->paginate($request->toArray())
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
