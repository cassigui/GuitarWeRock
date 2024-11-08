<?php

namespace App\Modules\Addressing\Cities;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $fillable = [
        'region_id',
    ];

    public $timestamps = false;

    public function state()
    {
        return $this->belongsTo('App\Modules\Addressing\States\State', 'state_id');
    }

    public function region()
    {
        return $this->belongsTo('App\Modules\Regions\Region', 'region_id');
    }

    public function addresses()
    {
        return $this->hasMany('App\Modules\Addressing\Addresses\Address');
    }
}
