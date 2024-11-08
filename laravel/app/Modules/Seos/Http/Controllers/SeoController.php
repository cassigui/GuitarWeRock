<?php

namespace App\Modules\Seos\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Seos\Http\Requests\SeoRequest;
use App\Modules\Seos\SeoService;
use Illuminate\Http\Request;

class SeoController extends Controller
{
    public function __construct(SeoService $seo_service)
    {
        // $this->authorizeResource("App\Modules\Seos\Seo", "App\Modules\Seos\Seo");
        $this->seo_service = $seo_service;
    }

    public function store(SeoRequest $request)
    {
        return response()->json([
            'error'   => false,
            'message' => __('wf.seos::toasts.store'),
            'seo'     => $this->seo_service->store($request->toArray()),
        ]);
    }

    public function update(SeoRequest $request, $id)
    {
        return response()->json([
            'error'   => false,
            'message' => __('wf.seos::toasts.update'),
            'seo'     => $this->seo_service->update($request->toArray(), $id),
        ]);
    }

    public function destroy($id)
    {
        $this->seo_service->destroy($id);

        return response()->json([
            'error'   => false,
            'message' => __('wf.seos::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->seo_service->restore($id);

        return response()->json([
            'error'   => false,
            'message' => __('wf.seos::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error' => false,
            'seos'  => $this->seo_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'seo'   => $this->seo_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->seo_service->api->paginate($request->toArray())
        );
    }

    protected function resourceAbilityMap()
    {
        return array_merge(parent::resourceAbilityMap(), [
            'ngTableGet' => 'view',
            'restore'    => 'restore',
        ]);
    }
}
