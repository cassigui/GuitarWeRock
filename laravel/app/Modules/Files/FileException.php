<?php

namespace App\Modules\Files;

use Symfony\Component\HttpKernel\Exception\HttpException;

class FileException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}
