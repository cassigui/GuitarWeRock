<?php

namespace App\Modules\Addressing\Addresses;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'addressable_type',
        'addressable_id',
        'cep',
        'city_id',
        'district',
        'street',
        'number',
        'complement',
        'main',
    ];

    public function addressable()
    {
        return $this->morphTo()->withTrashed();
    }

    public function customer()
    {
        return $this->addressable()->where('addressable_type', 'customers');
    }

    public function third_party()
    {
        return $this->addressable()->where('addressable_type', 'third_parties');
    }

    public function city()
    {
        return $this->belongsTo('App\Modules\Addressing\Cities\City');
    }
}
