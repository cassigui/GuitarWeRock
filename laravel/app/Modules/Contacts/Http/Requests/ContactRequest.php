<?php

namespace App\Modules\Contacts\Http\Requests;

use App\Modules\Base\BaseRequest;

class ContactRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            //
        ];
    }

    public function attributeNames()
    {
        return [
            //
        ];
    }

    public function messages()
    {
        return [
            //
        ];
    }
}
