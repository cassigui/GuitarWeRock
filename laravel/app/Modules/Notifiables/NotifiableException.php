<?php

namespace App\Modules\Notifiables;

use Symfony\Component\HttpKernel\Exception\HttpException;

class NotifiableException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}
