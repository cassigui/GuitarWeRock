<?php

namespace App\Modules\LandingPages;

use Symfony\Component\HttpKernel\Exception\HttpException;

class LandingPageException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}
