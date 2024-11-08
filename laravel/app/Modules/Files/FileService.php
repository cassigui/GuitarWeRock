<?php

namespace App\Modules\Files;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Modules\Base\Services\ApiService;
use App\Modules\Files\File as FilesModel;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class FileService
{
    public function __construct(FilesModel $model)
    {
        $this->model = $model;
        $this->api   = new ApiService($this->model);
        $this->s3          = Storage::disk('s3');
        $this->folder_temp = './temp';
        $this->folder_s3 = 'files';
    }

    public function store(array $data)
    {
        try {
            DB::beginTransaction();

            if ($data['base64']) {
                $base64 = $this->getExtensionBase64($data['base64']);
                $name   = Str::random(15) . '.' . $base64['extension'];
                $this->storeBase64($base64, $name);

            }


            $data['path'] = $this->folder_s3 . '/' . $data['fileable_type'] . '/' . $data['fileable_id'] . '_' . $name;

            $model = $this->model->create($data);

            $temp = $this->folder_temp . '/' . $name;

            $this->move_to_s3($temp, $data['path']);

            $this->delete_temp_file($temp);


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

            $model = $this->model->findOrFail($id);
            $model->update($data);

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }


        return $model;
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $model = $this->model->findOrFail($id);

            $this->s3->delete($model->path);

            $model->delete();

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }

        return true;
    }

    public function move_to_s3($path_temp, $path_s3)
    {
        $this->s3->put($path_s3, file_get_contents($path_temp));
    }

    public function delete_temp_file($path_temp)
    {
        if (!empty($path_temp) && file_exists($path_temp)) {
            unlink($path_temp);
        }
    }

    public function getExtensionBase64($pdf)
    {
        if (isset($pdf['base64'])) {
            $base = explode(',', $pdf['base64']);
        } else {
            $base = explode(',', $pdf);
        }

        $pdf     = $base[1];
        $extension = str_replace('data:application/', '', $base[0]);
        $extension = str_replace(';base64', '', $extension);
        return ['pdf' => $pdf, 'extension' => $extension];
    }

    public function storeBase64(array $pdfBase64, string $name)
    {
        if (!file_exists($this->folder_temp)) {
            File::makeDirectory($this->folder_temp, 0777, true);
        }

        $output_file = $this->folder_temp . '/' . $name;
        $pdf  = fopen($output_file, "wb");
        fwrite($pdf, base64_decode($pdfBase64['pdf']));
        fclose($pdf);
    }


    public function storeS3(string $folder, $file)
    {
        $path = Storage::disk('s3')->put($folder, $file);

        return str_replace("$folder/", '', $path);
    }

    public function removeFiles(array $file_ids)
    {
        try {
            DB::beginTransaction();

            foreach ($file_ids as $id) {
                $this->destroy($id);
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return true;
    }

    public function storeFiles(array $files, int $fileable_id, String $fileable_type)
    {
        foreach ($files as $k => $file) {
            if ($file['base64']) {
                $file['fileable_id']   = $fileable_id;
                $file['fileable_type'] = $fileable_type;

                $this->store($file);
            }
            else{
                $this->update($file, $file['id']);
            }
        }
    }
}
