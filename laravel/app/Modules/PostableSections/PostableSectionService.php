<?php

namespace App\Modules\PostableSections;

use App\Modules\PostableColumns\PostableColumnService;
use Illuminate\Support\Facades\DB;
use App\Modules\Base\Services\ApiService;

class PostableSectionService
{
    public function __construct(PostableSection $model, PostableColumnService $postable_column_service)
    {
        $this->model                   = $model;
        $this->postable_column_service = $postable_column_service;
        $this->api                     = new ApiService($this->model, $this->getCustomFilters(), $this->getCustomSorts());
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
            return $this->store($data);
        }

        return $this->update($data, $data['id']);
    }

    public function store(array $data)
    {
        try {
            DB::beginTransaction();

            $model = $this->model->create($data);

            $this->storeOrUpdatePostableColumns($data['postable_columns'], $model->id);

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

            $this->storeOrUpdatePostableColumns($data['postable_columns'], $model->id);

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return $model;
    }

    public function storeOrUpdatePostableColumns(array $data, int $section_id)
    {
        if (!empty($data)) {

            foreach ($data as $k => $column) {
                $column['postable_section_id'] = $section_id;
                $column['order']               = $k;
                $this->postable_column_service->storeOrUpdate($column);
            }

        }
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $model = $this->model->findOrFail($id);

            foreach ($model->postable_columns as $column) {
                $this->postable_column_service->destroy($column->id);
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
