<?php

namespace App\Modules\Seos;

use Symfony\Component\HttpKernel\Exception\HttpException;

class SeoException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}
