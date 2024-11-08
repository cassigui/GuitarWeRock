<?php

namespace App\Modules\PostableSections;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PostableSection extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'postable_id',
        'postable_type',
        'order',
    ];

    public function postable()
    {
        return $this->morphTo();
    }

    public function postable_columns()
    {
        return $this->hasMany('App\Modules\PostableColumns\PostableColumn')->orderBy('order', 'asc');
    }
}
