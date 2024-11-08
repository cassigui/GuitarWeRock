<?php

namespace App\Modules\Customers;

use App\Modules\Addressing\Addresses\AddressService;
use App\Modules\Base\Services\ApiService;
use App\Modules\Contacts\ContactService;
use Illuminate\Support\Facades\DB;
use App\Modules\Files\FileService;

class CustomerService
{
    public function __construct(Customer $model, AddressService $addressService, FileService $fileService, ContactService $contactService)
    {
        $this->model = $model;
        $this->address_service = $addressService;
        $this->contact_service = $contactService;
        $this->file_service = $fileService;
        $this->api = new ApiService($this->model, $this->getCustomFilters(), $this->getCustomSorts());
    }

    protected function getCustomFilters()
    {
        return [
            'input' => function($query, $key, $input){
                return $query->where('corporate_name', 'like', '%'. $input . '%')->orWhere('fantasy_name', 'like', '%' . $input . '%'
                );
            }
        ];
    }

    protected function getCustomSorts()
    {
        return [];
    }

    public function store(array $data)
    {
        try {
            DB::beginTransaction();

            $model = $this->model->create($data);

            if(isset($data['addresses']) && count($data['addresses']) > 0){
                foreach($data['addresses'] as $address){
                    $this->address_service->storeOrUpdate($address, 'customers', $model->id);
                    }
            }

            if(isset($data['contacts']) && count($data['contacts'])>0){
                foreach($data['contacts'] as $contact){
                    $this->contact_service->store($contact, $model->id);
                }
            }

            if($data['third_parties']){
                $model->third_parties()->sync($data['third_parties']);
            }

            if ($data['files']) {
                $this->file_service->storeFiles($data['files'], $model->id, 'customers');
            }

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

            if(isset($data['addresses']) && count($data['addresses'])>0){
                foreach($data['addresses'] as $address){
                    $this->address_service->storeOrUpdate($address, 'customers', $model->id);
                }
            }
            
            if(isset($data['contacts']) && count($data['contacts'])>0){
                foreach($data['contacts'] as $contact){
                    $this->contact_service->store($contact, $model->id);
                }
            }

            if ($data['files']) {
                $this->file_service->storeFiles($data['files'], $model->id, 'customers');
            }

            if($data['third_parties']){
                $model->third_parties()->sync($data['third_parties']);
            }

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

            $model = $this->model->with(['files', 'addresses', 'third_parties', 'contacts'])->findOrFail($id);

            $model->addresses()->delete();
            $model->files()->delete();
            $model->contacts()->delete();
            $model->third_parties()->detach();

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
