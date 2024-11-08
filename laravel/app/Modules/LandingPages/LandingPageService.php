<?php

namespace App\Modules\LandingPages;

use App\Modules\Images\ImageService;
use App\Modules\Testimonials\TestimonialService;
use App\Modules\PostableColumns\PostableColumnService;
use App\Modules\PostableSections\PostableSectionService;
use Illuminate\Support\Facades\DB;
use App\Modules\Base\Services\ApiService;
use Illuminate\Support\Str;

class LandingPageService
{
    public function __construct(TestimonialService $testimonial_service, LandingPage $model, PostableSectionService $postable_section_service, PostableColumnService $postable_column_service, ImageService $image_service)
    {
        $this->model                    = $model;
        $this->api                      = new ApiService($this->model, $this->getCustomFilters(), $this->getCustomSorts());
        $this->image_service            = $image_service;
        $this->testimonial_service      = $testimonial_service;
        $this->postable_section_service = $postable_section_service;
        $this->postable_column_service  = $postable_column_service;

        $this->thumbs = [
            // [
            //     'prefix' => 'thumb_',
            //     'width'  => 390,
            //     'height' => 285,
            // ],
            // [
            //     'prefix' => 'l_',
            //     'width'  => 812,
            //     'height' => 591,
            // ],
            // [
            //     'prefix' => 'm_',
            //     'width'  => 285,
            //     'height' => 161,
            // ],
            // [
            //     'prefix' => 's_',
            //     'width'  => 141,
            //     'height' => 94,
            // ],
            // [
            //     'prefix' => 'xs_',
            //     'width'  => 90,
            //     'height' => 90,
            // ],
        ];
    }

    protected function getCustomFilters()
    {
        return [
            // 'tags_id' => function($query, $key, $input) {
            //     return $query->whereHas('tags', function ($q) use($input) {
            //         return $q->whereIn('id', $input);
            //     });
            // }
        ];
    }

    protected function getCustomSorts()
    {
        return [
            // 'coluna' => function($query, $column, $order) {}
        ];
    }

    public function store(array $data)
    {
        try {
            DB::beginTransaction();

            $data['slug'] = Str::slug($data['title'], '-');
            $model        = $this->model->create($data);

            $model->tags()->sync($data['array_tags']);

            $this->storeOrUpdatePostableSections($data['postable_sections'], $model->id);

            if (isset($data['image'])) {
                $this->store_image($data['image'], $model->id);
            }

            // if (isset($data['testimonial'])) {
            //     $this->store_testimonial($data['testimonial'], $model->id);
            // }

            // if (isset($data['banner_image'])) {
            //     if ($data['banner_image']['base64']) {
            //         $data['banner_image']['imageable_id']   = $model->id;
            //         $data['banner_image']['category']   = 'banner';
            //         $data['banner_image']['imageable_type'] = 'landing_pages';
            //         $data['banner_image']['order']          = 0;
            //         $data['banner_image']['thumbs']         = $this->thumbs;

            //         $this->image_service->store($data['banner_image']);
            //     }
            // }

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return $model;
    }

    public function update(array $data, $id)
    {
        try {
            DB::beginTransaction();

            $data['slug'] = Str::slug($data['title'], '-');
            $model        = $this->model->findOrFail($id);

            $model->tags()->sync($data['array_tags']);

            $model->update($data);

            $this->storeOrUpdatePostableSections($data['postable_sections'], $model->id);

            if (isset($data['image'])) {
                if ($data['image']['base64'] && $model->image) {
                    $this->image_service->destroy($model->image->id, $this->thumbs);
                }
                $this->store_image($data['image'], $model->id);
            }

            // if (isset($data['testimonial'])) {
            //     if ($data['testimonial']['content'] && $model->testimonial) {
            //         $this->testimonial_service->destroy($model->testimonial->id);
            //     }
            //     $this->store_testimonial($data['testimonial'], $model->id);
            // }


            // if (isset($data['banner_image'])) {
            //     if ($data['banner_image']['base64'] && $model->banner_image) {
            //         $this->image_service->destroy($model->banner_image->id, $this->thumbs);
            //     }

            //     if ($data['banner_image']['base64']) {
            //         $data['banner_image']['imageable_id']   = $model->id;
            //         $data['banner_image']['category']   = 'banner';
            //         $data['banner_image']['imageable_type'] = 'landing_pages';
            //         $data['banner_image']['order']          = 0;
            //         $data['banner_image']['thumbs']         = $this->thumbs;

            //         $this->image_service->store($data['banner_image']);
            //     }
            // }

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return $model;
    }

    public function storeOrUpdatePostableSections(array $data, int $landing_page_id)
    {
        if (!empty($data)) {

            foreach ($data as $k => $section) {
                $section['postable_id']   = $landing_page_id;
                $section['postable_type'] = 'landing_pages';
                $section['order']         = $k;
                $_section                 = $this->postable_section_service->storeOrUpdate($section);
            }
        }
    }

    public function store_image(array $data, int $landing_page_id)
    {
        if ($data['base64']) {
            $data['banner']   = false;
            $data['imageable_id']   = $landing_page_id;
            $data['imageable_type'] = 'landing_pages';
            $data['order']          = 0;
            $data['thumbs']         = $this->thumbs;

            $this->image_service->store($data);
        }
    }

    public function store_testimonial(array $data, int $landing_page_id)
    {
        if ($data['content']) {
            $data['testimoniable_id']   = $landing_page_id;
            $data['testimoniable_type'] = 'landing_pages';

            $this->testimonial_service->store($data);
        }
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $this->model->findOrFail($id)->delete();
            
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return true;
    }

    public function reorder(array $data)
    {
        try {
            DB::beginTransaction();

            foreach ($data as $datum) {
                $this->model->where('id', $datum['id'])->update(['order' => $datum['order']]);
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return true;

    }

    public function restore($id)
    {
        try {
            DB::beginTransaction();

            $this->model->onlyTrashed()->findOrFail($id)->restore();

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return true;
    }
}
