<?php

namespace App\Modules\Seos;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Seo extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'slug',
        'title',
        'description',
    ];

    public function image()
    {
        return $this->morphOne('App\Modules\Images\Image', 'imageable')->orderBy('order', 'asc');
    }
}
