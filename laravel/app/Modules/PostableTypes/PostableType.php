<?php

namespace App\Modules\PostableTypes;

use Illuminate\Database\Eloquent\Model;

class PostableType extends Model
{
    protected $fillable = [
        'name',
    ];
}
