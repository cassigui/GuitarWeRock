<?php

namespace App\Helpers;

use App\Modules\Categories\Category;
use App\Modules\Departments\Department;
use App\Modules\Exams\Exam;


/**
 * Funções helpers para strings
 */
class StringHelper
{
    public static function get_thumb($image, $prefix = 'thumb_')
    {
        return str_replace('/' . $image->imageable_id . '_', '/' . $prefix . $image->imageable_id . '_', $image->path);
    }

    public static function isJson($string)
    {
        json_decode($string);
        return (json_last_error() == JSON_ERROR_NONE);
    }

    public static function phone($string = null)
    {
        if (!is_numeric($string)) {
            return $string;
        }

        $mask = self::getBrPhoneMask(strlen($string));

        if (empty($mask)) {
            return $string;
        }

        $numbers = str_split($string);

        foreach ($numbers as $number) {
            $position = strpos($mask, '#');
            if ($position !== false) {
                $mask = substr_replace($mask, $number, $position, 1);
            }
        }

        return $mask;
    }

    private static function getBrPhoneMask(int $string_length)
    {
        switch ($string_length) {
            case 10:
                return '(##) ####-####';
            case 11:
                return '(##) #####-####';
            case 12:
                return '+## (##) ####-####';
            case 13:
                return '+## (##) #####-####';
            default:
                return '';
        }
    }

    public static function money($number, $currency = 'R$ ')
    {
        if (empty($number)) {
            return '';
        }
        $formatted_number = number_format($number, 2, ',', '.');
        return "{$currency}{$formatted_number}";
    }

    public static function resumo(string $string, int $word_limit)
    {
        $string = strip_tags($string);
        $words  = explode(" ", $string);
        $dots   = (count($words) > $word_limit) ? ' ...' : '';

        return implode(" ", array_splice($words, 0, $word_limit)) . $dots;
    }

    public static function letterResumo(string $string, int $letter_limit)
    {
        $string           = strip_tags($string);
        $letters          = strlen($string);
        $dots             = ($letters > $letter_limit) ? ' ...' : '';
        $shortened_string = substr($string, 0, $letter_limit);
        $words            = explode(" ", $shortened_string);
        array_pop($words);

        return implode(" ", array_splice($words, 0)) . $dots;
    }

    /**
     *
     */
    public static function ucWords(string $string)
    {
        return ucwords(mb_strtolower($string));
    }
    public static function upWords(string $string)
    {
        return upwords(mb_strtoupper($string));
    }
    public static function cleanNumber($number)
    {
        return trim(
            str_replace(['(', ')', ' ', '-', '.', ',', '/', '_', '+'], '', $number)
        );
    }

    public static function cpf(string $cpf)
    {
        $mask = '###.###.###-##';

        $numbers = str_split($cpf);

        foreach ($numbers as $number) {
            $position = strpos($mask, '#');
            if ($position !== false) {
                $mask = substr_replace($mask, $number, $position, 1);
            }
        }

        return $mask;
    }

    public static function number($number, $dec = 2)
    {
        return number_format($number, $dec, ',', '');
    }

    public static function percentage($number)
    {
        return self::number((float) $number * 100) . '%';
    }

    public static function getCategories()
    {
        return Category::orderBy('name', 'asc')->get();
    }

    public static function getDepartments()
    {
        return Department::orderBy('name', 'asc')->get();
    }
    public static function getCourses()
    {
        return Course::orderBy('name', 'asc')->get();
    }
    public static function getExams()
    {
        return Exam::orderBy('id', 'asc')->get();
    }
    public static function formatDate($date)
    {
        return utf8_encode(strftime('%d %B %Y', strtotime($date)));
    }
}
