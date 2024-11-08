<?php

namespace App\Modules\Files;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class File extends Model
{

    protected $fillable = [
        'fileable_type',
        'fileable_id',
        'name',
        'path',
    ];

    public function fileable()
    {
        return $this->morphTo();
    }
}
