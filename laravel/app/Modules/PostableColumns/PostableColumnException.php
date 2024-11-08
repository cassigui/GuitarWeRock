<?php

namespace App\Modules\PostableColumns;

use Symfony\Component\HttpKernel\Exception\HttpException;

class PostableColumnException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}
