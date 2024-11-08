<?php

namespace App\Modules\PostableTypes;

use Symfony\Component\HttpKernel\Exception\HttpException;

class PostableTypeException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}
