<?php

namespace App\Modules\PostableTypes\Http\Requests;

use App\Modules\Base\BaseRequest;

class PostableTypeRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required',
        ];
    }

    public function attributeNames()
    {
        return [
            'name' => 'Nome',
        ];
    }

    public function messages()
    {
        return [
            //
        ];
    }
}
