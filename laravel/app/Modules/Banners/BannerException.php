<?php

namespace App\Modules\Banners;

use Symfony\Component\HttpKernel\Exception\HttpException;

class BannerException extends HttpException
{
    public function __construct(int $statusCode, string $message = null)
    {
        parent::__construct($statusCode, $message);
    }
}
