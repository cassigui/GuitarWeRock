<?php

namespace App\Modules\Account\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Account\AccountException;
use App\Modules\Account\Auth\TokenService;
use App\Modules\Account\Http\Requests\LogInRequest;
use Illuminate\Http\Request;

class TokenController extends Controller
{
    public function __construct(TokenService $token_service)
    {
        $this->token_service = $token_service;
    }

    public function authenticate(LogInRequest $request)
    {
        $relations = $request->relations ?? [];
        $result    = $this->token_service->authenticate(
            $request->only('username', 'password'),
            $relations,
            true
        );

        return response()->json([
            'error'  => false,
            'token'  => $result['token'],
            'pcrypt' => encrypt($request->password),
            'user'   => $result['user'],
        ]);
    }

    public function validateLogin(LogInRequest $request)
    {
        $decrypt = decrypt($request->toArray()['password']);

        $credentials = [
            'username' => $request->username,
            'password' => $decrypt,
        ];

        $relations = $request->relations ?? [];
        $result    = $this->token_service->validateLogin(
            $credentials,
            $relations,
            false
        );

        return response()->json([
            'error'  => false,
            'token'  => $result['token'],
            'pcrypt' => $request->password,
            'user'   => $result['user'],
        ]);
    }

    public function validateToken(Request $request)
    {
        $relations = $request->relations ?? [];

        return response()->json(
            $this->token_service->validateToken($request->token ?? '', $relations, true)
        );
    }
}
