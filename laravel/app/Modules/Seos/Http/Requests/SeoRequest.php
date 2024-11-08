<?php

namespace App\Modules\Seos\Http\Requests;

use App\Modules\Base\BaseRequest;

class SeoRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title'       => 'required',
            'description' => 'required',
        ];
    }

    public function attributeNames()
    {
        return [
            'title'       => 'Título',
            'description' => 'Descrição',
        ];
    }

    public function messages()
    {
        return [
            //
        ];
    }
}
