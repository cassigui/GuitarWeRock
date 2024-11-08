<?php

namespace App\Modules\Files\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Files\FileService;
use App\Modules\Files\Http\Requests\FileRequest;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function __construct(FileService $file_service)
    {
        // $this->authorizeResource("App\Modules\Files\File", "App\Modules\Files\File");
        $this->file_service = $file_service;
    }

    public function store(Request $data)
    {
        return response()->json([
            'error'   => false,
            'message' => __('wf.files::toasts.store'),
            'file'    => $this->file_service->store($data->toArray()),
        ]);
    }

    public function update(Array $data,$id)
    {
        return response()->json([
            'error'   => false,
            'message' => __('wf.files::toasts.update'),
            'file'    => $this->file_service->update($data, $id),
        ]);
    }

    public function destroy($id)
    {
        $this->file_service->destroy($id);

        return response()->json([
            'error'   => false,
            'message' => __('wf.files::toasts.destroy'),
        ]);
    }

    public function restore($id)
    {
        $this->file_service->restore($id);

        return response()->json([
            'error'   => false,
            'message' => __('wf.files::toasts.restore'),
        ]);
    }

    public function get(Request $request)
    {
        return response()->json([
            'error' => false,
            'files' => $this->file_service->api->get($request->toArray()),
        ]);
    }

    public function find(Request $request)
    {
        return response()->json([
            'error' => false,
            'file'  => $this->file_service->api->find($request->toArray()),
        ]);
    }

    public function paginate(Request $request)
    {
        return response()->json(
            $this->file_service->api->paginate($request->toArray())
        );
    }

    protected function resourceAbilityMap()
    {
        return array_merge(parent::resourceAbilityMap(), [
            'ngTableGet' => 'view',
            'restore'    => 'restore',
        ]);
    }

    public function removeFiles(Request $request)
    {
        $this->file_service->removeFiles($request->file_ids ?? []);

        return response()->json([
            'error'   => false,
            'message' => __('wf.files::toasts.destroy'),
        ]);
    }
}
