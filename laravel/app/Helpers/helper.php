<?php
function auditing($msg, $auth = NULL)
{
	$auth = ($auth == NULL) ? Auth::id() : $auth;
	$a = new App\Entities\Auditing;
	$a->action = $msg;
	$a->users_id = $auth;
	$a->save();
}
function clean_number($number)
{
	$number = str_replace('(', '', $number);
	$number = str_replace(')', '', $number);
	$number = str_replace(' ', '', $number);
	$number = str_replace('-', '', $number);
	$number = str_replace('.', '', $number);
	$number = str_replace(',', '', $number);
	$number = str_replace('/', '', $number);
	$number = str_replace('_', '', $number);
	return trim($number);
}
function variation_name($id)
{
	$variation = \App\Entities\Variation::find($id);

	if ($variation) {
		return $variation->name;
	}
	return null;
}
function convertMoney($valor)
{
	$valor = str_replace('.', '', $valor);
	$valor = str_replace('R$ ', '', $valor);
	return str_replace(',', '.', $valor);
}
function money($number, $currency = 'R$ ')
{
	if (empty($number)) {
		return '';
	}
	$formatted_number = number_format($number, 2, ',', '.');
	return "{$currency}{$formatted_number}";
}
function resumo($string, $word_limit, $dot = TRUE)
{
	$string = strip_tags($string);
	$words = explode(" ", $string);
	$dots = (count($words) > $word_limit && $dot) ? ' ...' : '';
	return implode(" ", array_splice($words, 0, $word_limit)) . $dots;
}

function resume_by_character($string, $character_limit)
{

	$description = $string;

	if (strlen($description) > $character_limit) {
		$description = substr($description, 0, $character_limit);
		$word_count = count(explode(" ", $description)) - 1;
		$description = resumo($description, $word_count, false);
	}

	return $description;
}

function checkEmailDns($email)
{
	$dominio = explode('@', $email);
	if (!checkdnsrr($dominio[1], 'A')) {
		return FALSE;
	} else {
		return TRUE;
	}
}
function level($v)
{
	if (\Auth::user()->levels_id != $v)
		return FALSE;
	return TRUE;
}
function setDate($date = NULL)
{
	if ($date != NULL) :
		$d = explode('-', $date);
		return $d[2] . '-' . $d[1] . '-' . $d[0];
	endif;
}
function setDateBar($date = NULL)
{
	if ($date != NULL) :
		$d = explode('/', $date);
		return $d[2] . '-' . $d[1] . '-' . $d[0];
	endif;
}
function mailTo($from, $to, $subject, $message)
{
	App\Jobs\SendNotificationEmail::dispatch($from, $to, $subject, $subject, $message, url('/'));
}
function get_spotlight_posts()
{
	return App\Modules\LandingPages\LandingPage::where('active', 1)->where('spotlight', 1)->get();
}

function get_tumor_types()
{
	return App\Modules\TumorTypes\TumorType::get();
}
