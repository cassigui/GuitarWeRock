<?php

namespace App\Modules\Addressing\States;

use App\Modules\Base\Services\ApiService;

class StateService
{
    public function __construct(State $model)
    {
        $this->model = $model;
        $this->api   = new ApiService($this->model);
    }
}
