<?php

namespace App\Modules\PostableSections;

use Symfony\Component\HttpKernel\Exception\HttpException;

class PostableSectionException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}
