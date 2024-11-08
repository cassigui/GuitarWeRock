<?php

namespace App\Modules\PostableSections\Http\Requests;

use App\Modules\Base\BaseRequest;

class PostableSectionRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'postable_id'   => 'required',
            'postable_type' => 'required',
            'order'         => 'required',
        ];
    }

    public function attributeNames()
    {
        return [
            'postable_id'   => 'ID polimórfico',
            'postable_type' => 'Chave polimórfica',
            'order'         => 'Ordem',
        ];
    }

    public function messages()
    {
        return [
            //
        ];
    }
}
