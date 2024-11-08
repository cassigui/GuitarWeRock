<?php

namespace App\Modules\LandingPages;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LandingPage extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'autor_id',
        'title',
        'post_date',
        'slug',
        'page_category_id',
        'active',
    ];

    protected $casts = [
        'active'    => 'boolean',
    ];

    public function postable_sections()
    {
        return $this->morphMany('App\Modules\PostableSections\PostableSection', 'postable')->orderBy('order', 'asc');
    }

    public function image()
    {
        return $this->morphOne('App\Modules\Images\Image', 'imageable')->where('category', NULL);
    }

    
    public function testimonial()
    {
        return $this->morphOne('App\Modules\Testimonials\Testimonial', 'testimoniable');
    }

    public function tags()
    {
        return $this->belongsToMany('App\Modules\Tags\Tag');
    }
    
    public function autor()
    {
        return $this->belongsTo('App\Modules\Autores\Autor')->withTrashed();
    }
}
