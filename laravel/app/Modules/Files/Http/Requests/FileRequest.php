<?php

namespace App\Modules\Files\Http\Requests;

use App\Modules\Base\BaseRequest;

class FileRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name'          => 'required',
            'description'   => 'required',
            'base64'        => 'required',
            'category'      => 'required',
            'fileable_type' => 'required',
            'fileable_id'   => 'required'
        ];
    }

    public function attributeNames()
    {
        return [
            'name'        => 'Nome',
            'description' => 'Descrição',
            'base64'      => 'Arquivo',
            'category'    => 'Categoria'
        ];
    }

    public function messages()
    {
        return [
            //
        ];
    }
}
