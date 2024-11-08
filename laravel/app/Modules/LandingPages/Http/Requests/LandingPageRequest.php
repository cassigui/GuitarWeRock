<?php

namespace App\Modules\LandingPages\Http\Requests;

use App\Modules\Base\BaseRequest;

class LandingPageRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $id = $this->segment(3);

        return [
            'title'        => 'required',
            'page_category_id'     => 'required',
            'active'       => 'required',
            // 'autor_id'       => 'required',
            'post_date'       => 'required',
        ];
    }

    public function attributeNames()
    {
        return [
            'title'      => 'Título',
            'subtitle' => 'Subtítulo',
            'post_date' =>'Data de postagem',
            'active'     => 'Ativo/Desativo',
            'page_category_id'  => 'Id da landing page',
            // 'autor_id'  => 'Autor',
        ];
    }

    public function messages()
    {
        return [
            //
        ];
    }
}
