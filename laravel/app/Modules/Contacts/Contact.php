<?php

namespace App\Modules\Contacts;

use App\Modules\Customers\Customer;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'customer_id',
    ];

    public function customer(){
        return $this->belongsTo(Customer::class, 'customer_id');
    }
}
