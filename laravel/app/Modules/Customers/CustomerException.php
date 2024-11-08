<?php

namespace App\Modules\Customers;

use Symfony\Component\HttpKernel\Exception\HttpException;

class CustomerException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}
