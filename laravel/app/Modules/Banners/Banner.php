<?php

namespace App\Modules\Banners;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Banner extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'link',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public function image()
    {
        return $this->morphOne('App\Modules\Images\Image', 'imageable');
    }
}
