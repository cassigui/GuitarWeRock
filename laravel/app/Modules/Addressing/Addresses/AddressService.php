<?php

namespace App\Modules\Addressing\Addresses;

use Illuminate\Support\Facades\DB;
use App\Modules\Base\Services\ApiService;

class AddressService
{
    public function __construct(Address $model)
    {
        $this->model = $model;
        $this->api   = new ApiService($this->model, $this->getCustomFilters());
    }

    protected function getCustomFilters()
    {
        return [
            'city_region_id'       => function ($query, $key, $input) {
                return $query->whereHas('city', function ($q) use ($input) {
                    $q->where('region_id', $input);
                });
            },
            'addresses_customer_id'       => function ($query, $key, $input) {
                return $query->where('addressable_id', $input);
            },
            'with_addressable_customer'       => function ($query, $key, $input) {
                return $query->with(['addressable_type'], function ($q) use ($input) {
                    $q->where('region_id', $input);
                });
            },
        ];
    }

    public function store(array $data, $addressable_type, $addressable_id)
    {
        try {
            DB::beginTransaction();

            $data['addressable_type'] = $addressable_type;
            $data['addressable_id']   = $addressable_id;

            $address = $this->model->create($data);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        return $address;
    }

    public function update(array $data, $addressable_type, $addressable_id)
    {
        try {
            DB::beginTransaction();

            $data['addressable_type'] = $addressable_type;
            $data['addressable_id']   = $addressable_id;

            $address = $this->model
                ->where('addressable_type', $addressable_type)
                ->where('addressable_id', $addressable_id)
                ->where('id', $data['id'])
                ->firstOrFail();

            $address->update($data);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        return $address;
    }

    public function storeOrUpdate(array $data, $addressable_type, $addressable_id)
    {

        try {
            DB::beginTransaction();

            $data['addressable_type'] = $addressable_type;
            $data['addressable_id']   = $addressable_id;

            if (empty($data['id'])) {
                $address = $this->model->create($data);
            } else {
                $address = $this->model->findOrFail($data['id']);
                $address->update($data);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        return $address;
    }

    public function destroy($addressable_type, $addressable_id)
    {
        try {
            DB::beginTransaction();

            $this->model
                ->where('addressable_type', $addressable_type)
                ->where('addressable_id', $addressable_id)
                ->firstOrFail()->delete();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        return true;
    }

    public function destroyById($id)
    {
        try {
            DB::beginTransaction();

            $this->model->findOrFail($id)->delete();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        return true;
    }

    public function restore($addressable_type, $addressable_id)
    {
        try {
            DB::beginTransaction();

            $this->model->onlyTrashed()
                ->where('addressable_type', $addressable_type)
                ->where('addressable_id', $addressable_id)
                ->firstOrFail()->restore();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        return true;
    }
}
