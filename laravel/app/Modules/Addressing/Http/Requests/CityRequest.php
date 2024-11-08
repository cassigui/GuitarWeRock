<?php

namespace App\Modules\Addressing\Http\Requests;

use App\Modules\Base\BaseRequest;

class CityRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'generation_factor.value' => 'numeric|required',
        ];
    }

    public function attributeNames()
    {
        return [
            'generation_factor.value' => 'Fator de geração',
        ];
    }

    public function messages()
    {
        return [
            //
        ];
    }
}
