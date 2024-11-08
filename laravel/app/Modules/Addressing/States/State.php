<?php

namespace App\Modules\Addressing\States;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    protected $primaryKey = 'id';

    public function cities()
    {
        return $this->hasMany('App\Modules\Addressing\Cities\City', 'state_id');
    }

    public function country()
    {
        return $this->belongsTo('App\Modules\Addressing\Countries\Country');
    }

}
