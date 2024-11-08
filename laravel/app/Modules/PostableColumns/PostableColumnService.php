<?php

namespace App\Modules\PostableColumns;

use App\Modules\Images\ImageService;
use Illuminate\Support\Facades\DB;
use App\Modules\Base\Services\ApiService;

class PostableColumnService
{
    public function __construct(PostableColumn $model, ImageService $image_service)
    {
        $this->model         = $model;
        $this->image_service = $image_service;
        $this->api           = new ApiService($this->model, $this->getCustomFilters(), $this->getCustomSorts());
    
        $this->thumbs = [
            [
                'prefix' => 'thumb_',
                'width'  => 538,
                'height' => 444,
            ],
            [
                'prefix' => 'block_',
                'width'  => 871,
                'height' => 437,
            ],
        ];
    }

    protected function getCustomFilters()
    {
        return [
            // 'chave' => function($query, $key, $input) {}
        ];
    }

    protected function getCustomSorts()
    {
        return [
            // 'coluna' => function($query, $column, $order) {}
        ];
    }

    public function storeOrUpdate(array $data)
    {
        if (!$data['id']) {
            $model = $this->store($data);
        } else {
            $model = $this->update($data, $data['id']);
        }

        if ($model->postable_type_id == 2 && !empty($data['image']) && !empty($data['image']['base64'])) {
            if ($model->image != null) {
                $this->image_service->destroy($model->image->id);
            } 

            $data['image']['imageable_id']   = $model->id;
            $data['image']['imageable_type'] = 'postable_columns';
            $data['image']['order']          = 0;
            $data['image']['thumbs'] = $this->thumbs;

            $this->image_service->store($data['image']);
        }

    }

    public function store(array $data)
    {
        try {
            DB::beginTransaction();

            $model = $this->model->create($data);

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return $model;
    }

    public function update(array $data, $id)
    {
        try {
            DB::beginTransaction();

            $model = $this->model->findOrFail($id);

            $model->update($data);

            if ($model->postable_type_id == 2 && !empty($data['image']) && !empty($data['image']['caption'])) {
                $this->image_service->changeCaption($data['image']);
            }

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return $model;
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $model = $this->model->findOrFail($id);

            if ($model->image) {
                $this->image_service->destroy($model->image->id);
            }

            $model->delete();

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return true;
    }

    public function restore($id)
    {
        try {
            DB::beginTransaction();

            $this->model->onlyTrashed()->findOrFail($id)->restore();

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return true;
    }
}
