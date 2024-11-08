<?php

namespace App\Modules\Banners\Http\Requests;

use App\Modules\Base\BaseRequest;

class BannerRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'active' => 'required',
        ];
    }

    public function attributeNames()
    {
        return [
            'active' => 'Ativo'
        ];
    }

    public function messages()
    {
        return [
            //
        ];
    }
}
