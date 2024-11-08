<?php

namespace App\Modules\Addressing\Countries;

use App\Modules\Base\Services\ApiService;

class CountryService
{
    public function __construct(Country $model)
    {
        $this->model = $model;
        $this->api   = new ApiService($this->model);
    }
}
