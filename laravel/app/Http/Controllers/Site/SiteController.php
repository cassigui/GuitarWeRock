<?php

namespace App\Http\Controllers\Site;

use App\Modules\Seos\SeoService;
use App\Http\Controllers\Controller;

class SiteController extends Controller
{
    public function __construct(SeoService $seo_service)
    {
        setlocale(LC_TIME, 'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');
        date_default_timezone_set('America/Sao_Paulo');

        $this->seo_service = $seo_service;

    }

    public function base()
    {
        $seo = $this->seo_service->model
            ->where('slug', 'index')
            ->first()
            ->load('image');
        
        return view(('site.base.index'),compact('seo'));
    }

}
