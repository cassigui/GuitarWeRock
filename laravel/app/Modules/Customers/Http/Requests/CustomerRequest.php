<?php

namespace App\Modules\Customers\Http\Requests;

use App\Modules\Base\BaseRequest;

class CustomerRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'doc' => 'required|min:11|max:14',
            'responsible_name' => 'required',
            'responsible_phone' => 'required',
            'corporate_name' => 'required',
            'fantasy_name' => 'required',
            'phone' => 'nullable',
            'whatsapp' => 'required',
            'email' => 'required|email:dns,rfc',
            'tons' => 'required',
            'notify_whatsapp' => 'required',
            'notify_email' => 'required',
            'addresses.*.cep' => 'required',
            'addresses.*.street' => 'required',
            'addresses.*.number' => 'required',
            'addresses.*.complement' => 'nullable',
            'addresses.*.district' => 'required',
            'addresses.*.city_id' => 'required',
            'files.*.name' => 'required',
            'files.*.base64' => 'nullable',
            'contacts.*.email' => 'required|email:dns,rfc',
            'contacts.*.name' => 'required',
            'contacts.*.phone' => 'required'
        ];
    }

    public function attributeNames()
    {
        return [
            'doc' => 'CPF/CNPJ',
            'responsible_name' => 'Nome do responsável',
            'responsible_phone' => 'Telefone do responsável',
            'corporate_name' => 'Razão Social',
            'fantasy_name' => 'Nome Fantasia',
            'phone' => 'Telefone',
            'whatsapp' => 'WhatsApp',
            'email' => 'E-mail',
            'tons' => 'Toneladas',
            'notify_whatsapp' => 'Notificar WhatsApp',
            'notify_email' => 'Notificar e-mail',
            'addresses.*.cep' => 'CEP',
            'addresses.*.street' => 'Logradouro',
            'addresses.*.number' => 'Número',
            'addresses.*.district' => 'Bairro',
            'addresses.*.complement' => 'Complemento',
            'files.*.name' => 'Nome',
            'contacts.*.email' => 'E-mail do contato extra',
        ];
    }

    public function messages()
    {
        return [
            'addresses.*.city_id.required' => 'Escolha uma cidade.',
            'files.*.name.required' => 'Todos os arquivos precisam ter :attribute.',
            'doc.min' => 'O documento tem dígitos a menos.',
            'doc.max' => 'O documento tem dígitos demais.',
            'contacts.*.email.required' => 'Todos os contatos extras precisam ter e-mails.',
            'contacts.*.name.required' => 'Todos os contatos extras precisam ter um nome',
            'contacts.*.phone.required' => 'Todos os contatos extras precisam de telefone'
        ];
    }
}
