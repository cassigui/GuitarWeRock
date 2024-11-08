<?php

namespace App\Modules\Addressing\Countries;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    public function states()
    {
        return $this->hasMany('App\Modules\Addressing\States\State');
    }
}
