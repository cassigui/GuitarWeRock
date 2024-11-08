<?php

namespace App\Modules\Contacts;

use Symfony\Component\HttpKernel\Exception\HttpException;

class ContactException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}
