<?php

namespace App\Modules\PostableColumns\Http\Requests;

use App\Modules\Base\BaseRequest;

class PostableColumnRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'postable_section_id' => 'required',
            'order'               => 'required',
            'postable_type_id'    => 'required',
        ];
    }

    public function attributeNames()
    {
        return [
            'postable_section_id' => 'ID de seção',
            'order'               => 'Ordem',
            'postable_type_id'    => 'Tipo do conteúdo',
        ];
    }

    public function messages()
    {
        return [
            //
        ];
    }
}
