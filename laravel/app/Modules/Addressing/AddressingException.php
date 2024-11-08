<?php

namespace App\Modules\Addressing;

use Symfony\Component\HttpKernel\Exception\HttpException;

class AddressingException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}
