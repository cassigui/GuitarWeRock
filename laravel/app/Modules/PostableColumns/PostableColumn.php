<?php

namespace App\Modules\PostableColumns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PostableColumn extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'postable_section_id',
        'order',
        'title',
        'content',
        'code',
        'url',
        'postable_type_id',
    ];

    public function image()
    {
        return $this->morphOne('App\Modules\Images\Image', 'imageable');
    }

    public function postable_type()
    {
        return $this->belongsTo('App\Modules\PostableTypes\PostableType');
    }

    public function getEmbedVideoAttribute()
    {
        $youtube = strpos($this->url, 'youtube');
        $vimeo   = strpos($this->url, 'vimeo');

        if ($youtube !== false) {
            return $this->convertYoutube($this->url);
        } elseif ($vimeo !== false) {
            return $this->convertVimeo($this->url);
        }

        return null;
    }

    private function convertYoutube($string)
    {
        return preg_replace(
            "/\s*[a-zA-Z\/\/:\.]*youtu(be.com\/watch\?v=|.be\/)([a-zA-Z0-9\-_]+)([a-zA-Z0-9\/\*\-\_\?\&\;\%\=\.]*)/i",
            "https://www.youtube.com/embed/$2",
            $string
        );
    }

    private function convertVimeo($string)
    {
        return 'https://player.vimeo.com/video/' . $this->getVimeoVideoId($string);
    }

    private function getVimeoVideoId($url)
    {
        $url = substr(parse_url($url, PHP_URL_PATH), 1);

        if (strpos($url, '/')) {
            $url = explode('/', $url)[1];
        }

        return $url;
    }

}
