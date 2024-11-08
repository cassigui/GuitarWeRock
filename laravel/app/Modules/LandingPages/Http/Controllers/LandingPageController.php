<?php

namespace App\Modules\LandingPages\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LandingPages\Http\Requests\LandingPageRequest;
use App\Modules\LandingPages\LandingPageService;
use Illuminate\Http\Request;

class LandingPageController extends Controller
{
    public function __construct(LandingPageService $landing_page_service)
    {
        // $this->authorizeResource("App\Modules\LandingPages\LandingPage", "App\Modules\LandingPages\LandingPage");
        $this->landing_page_service = $landing_page_service;
    }

    public function store(LandingPageRequest $request)
    {
        return response()->json([
            'error' => false,
            'message' => __('wf.landing_pages::toasts.store'),
            'landing_page' => $this->landing_page_service->store($request->toArray()),
        ]);
    }

    public function update(LandingPageRequest $request, $id)
    {
        return response()->json([
            'error' => false,
            'message' => __('wf.landing_pages::toasts.update'),
            'landing_page' => $this->landing_page_service->update($request->toArray(), $id),
        ]);
    }

    public function destroy($id)
    {
        $this->landing_page_service->destroy($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.landing_pages::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->landing_page_service->restore($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.landing_pages::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error' => false,
            'landing_pages' => $this->landing_page_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'landing_page' => $this->landing_page_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->landing_page_service->api->paginate($request->toArray())
        );
    }

    protected function resourceAbilityMap()
    {
        return array_merge(parent::resourceAbilityMap(), [
            'ngTableGet' => 'view',
            'restore' => 'restore',
        ]);
    }

    public function reorder(Request $request)
    {
        $this->landing_page_service->reorder($request->except('token'));

        return response()->json([
            'error'   => false,
            'message' => __('wf.landing_pages::toasts.reorder'),
        ]);
    }
}
