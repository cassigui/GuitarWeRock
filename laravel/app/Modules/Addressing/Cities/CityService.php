<?php

namespace App\Modules\Addressing\Cities;

use Illuminate\Support\Facades\DB;
use App\Modules\Base\Services\ApiService;

class CityService
{
    public function __construct(
        City $model
    ) {
        $this->model                     = $model;
        $this->api                       = new ApiService($this->model, $this->getCustomFilters(), $this->getCustomSorts());
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

    public function update(array $data, $id)
    {
        try {

            DB::beginTransaction();

            $model = $this->model->findOrFail($id);

            $model->update($data);

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return $model;
    }
}
