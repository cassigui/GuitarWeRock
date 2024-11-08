<?php

namespace App\Modules\Account\Http\Requests;

use App\Modules\Base\BaseRequest;
use Illuminate\Validation\Rules\Password;

class UpdatePasswordRequest extends BaseRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email'                 => 'required|email|max:255',
            'token'                 => 'required|string|size:6',
            'password'              => ['required', 'confirmed', 'max:30', Password::min(8)->letters()->mixedCase()->numbers()->symbols()->uncompromised()],
            'password_confirmation' => 'required|same:password|min:6|max:30',
        ];
    }

    public function attributeNames()
    {
        return [
            'email'                 => 'E-MAIL',
            'token'                 => 'code',
            'password'              => 'password',
            'password_confirmation' => 'confirm password',
        ];
    }

    public function messages()
    {
        return [
            'token.size' => 'Code min 6 digits.',
        ];
    }
}
