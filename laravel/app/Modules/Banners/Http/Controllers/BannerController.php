<?php

namespace App\Modules\Banners\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Banners\Http\Requests\BannerRequest;
use App\Modules\Banners\BannerService;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    public function __construct(BannerService $banner_service)
    {
        // $this->authorizeResource("App\Modules\Banners\Banner", "App\Modules\Banners\Banner");
        $this->banner_service = $banner_service;
    }

    public function store(BannerRequest $request)
    {
        return response()->json([
            'error' => false,
            'message' => __('wf.banners::toasts.store'),
            'banner' => $this->banner_service->store($request->toArray()),
        ]);
    }

    public function update(BannerRequest $request, $id)
    {
        return response()->json([
            'error' => false,
            'message' => __('wf.banners::toasts.update'),
            'banner' => $this->banner_service->update($request->toArray(), $id),
        ]);
    }

    public function destroy($id)
    {
        $this->banner_service->destroy($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.banners::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->banner_service->restore($id);

        return response()->json([
            'error' => false,
            'message' => __('wf.banners::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error' => false,
            'banners' => $this->banner_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'banner' => $this->banner_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->banner_service->api->paginate($request->toArray())
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
        $this->banner_service->reorder($request->except('token'));

        return response()->json([
            'error'   => false,
            'message' => __('wf.banners::toasts.reorder'),
        ]);
    }
}
