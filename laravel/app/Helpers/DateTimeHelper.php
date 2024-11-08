<?php

namespace App\Helpers;

use Carbon\Carbon;

/**
 * Helper que manipula data/hora
 */
class DateTimeHelper
{
    /**
     * @return string data/horário baseado no formato recebido
     */
    public static function date($format, $date)
    {
        return date($format, strtotime($date ?? Carbon::now()));
    }

    /**
     * @return string Formato "AAAA-MM-DDThh:mm:ssTZD"
     * (UTC - Universal Coordinated Time)
     */
    public static function getUTC($date = null)
    {
        return self::date("Y-m-d\TH:i:sP", $date);
    }

    /**
     * @return string Formato "TZD"
     */
    public static function getTimezone($date = null)
    {
        return self::date("P", $date);
    }

    /**
     * @return string Formato "AAAA-MM-DD"
     */
    public static function getDate($date = null)
    {
        return self::date("Y-m-d", $date);
    }

    /**
     * @return string Formato "hh:mm:ss"
     */
    public static function getTime($date = null)
    {
        return self::date("H:i:s", $date);
    }

    /**
     * @return string Formato "AAAA-MM-DD hh:mm:ss"
     */
    public static function getDateTime($date = null)
    {
        return self::date("Y-m-d H:i:s", $date);
    }

    /**
     * @return \Carbon\Carbon
     */
    public static function getCarbon($date = null)
    {
        return empty($date) ? Carbon::now() : Carbon::parse($date);
    }

    /**
     * @return \Carbon\Carbon
     */
    public static function carbonFrom($format, $date = null)
    {
        return empty($date) ? Carbon::now() : Carbon::createFromFormat($format, $date);
    }

    /**
     * @return string Formato "DD/MM/AAAA"
     */
    public static function getDateBar($date = null)
    {
        return self::date('d/m/Y', $date);
    }

    /**
     * @return string Formato "AAAAMM"
     */
    public static function getYearMonth($date = null)
    {
        return self::date('Ym', $date);
    }

    public static function dmyDateFilter(string $date)
    {
        $pieces = explode('/', $date);

        switch (strlen($date)) {
            case 2:
                return "-{$pieces[0]}";
            case 4:
                return "{$pieces[0]}-";
            case 5:
                return "{$pieces[1]}-{$pieces[0]}";
            case 10:
                return "{$pieces[2]}-{$pieces[1]}-{$pieces[0]}";
            default:
                return "$date";
        }
    }

    public static function convertW3C($datetime)
    {
        $datetime = str_replace('T', ' ', $datetime);
        $d        = explode('.', $datetime);
        return $d[0];
    }
    public static function workingDays($start_date,$end_date)
    {
        $start_date = $start_date;

        $begin = strtotime($start_date);
        $end   = strtotime($end_date); 

        if ($begin > $end) {
            echo "Data de início está no futuro! <br/>";
            return 0;
        } else {
            $holidays = array('01/01', '15/04', '21/04', '01/05', '16/06', '26/07', '07/09', '15/09', '12/10', '02/11', '15/11', '25/12');
            $weekends = 0;
            $no_days = 0;
            $holidayCount = 0;
            while ($begin <= $end) {
                $no_days++; // no of days in the given interval
                if (in_array(date("d/m", $begin), $holidays)) {
                    $holidayCount++;
                }
                $what_day = date("N", $begin);
                if ($what_day > 5) { // 6 and 7 are weekend days
                    $weekends++;
                };
                $begin += 86400; // +1 day
            };
            $working_days = $no_days - $weekends - $holidayCount;

            return $working_days;
        }
    }
}
