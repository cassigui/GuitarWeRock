<?php

namespace App\Modules\Contacts;

use Illuminate\Support\Facades\DB;
use App\Modules\Base\Services\ApiService;

class ContactService
{
    public function __construct(Contact $model)
    {
        $this->model = $model;
        $this->api = new ApiService($this->model, $this->getCustomFilters(), $this->getCustomSorts());
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

    public function store(array $data, int $fk)
    {
        try {
            DB::beginTransaction();

            $data['customer_id'] = $fk;
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

    public function storeOrUpdate(array $data, $customer_id)
    {

        try {
            DB::beginTransaction();

            $data['customer_id']   = $customer_id;

            if (empty($data['id'])) {
                $customer = $this->model->create($data);
            } else {
                $customer = $this->model->findOrFail($data['id']);
                $customer->update($data);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        return $customer;
    }
}
