<?php

namespace App\Modules\Addressing\Http\Requests;

use App\Modules\Base\BaseRequest;

class AddressRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name'             => 'nullable|string|max:100',
            'cep'              => 'required|numeric|size:8',
            'addressable_type' => 'required|string|max:200',
            'addressable_id'   => 'required|numeric',
            'city_id'          => 'required|numeric',
            'street'           => 'required|string|max:200',
            'number'           => 'required|string|max:10',
            'complement'       => 'nullable|string|max:200',
            'main'     => 'required|numeric'
        ];
    }

    public function attributeNames()
    {
        return [
            'name'             => 'Apelido',
            'cep'              => 'CEP',
            'addressable_type' => 'Referência',
            'addressable_id'   => 'Número da referência',
            'city_id'          => 'Cidade',
            'street'           => 'Rua',
            'number'           => 'Número',
            'complement'       => 'Complemento',
        ];
    }

    public function messages()
    {
        return [
            //
        ];
    }
}
