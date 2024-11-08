<?php

namespace App\Services\Contact;

use App\Mail\Contact;
use Mail;
use Value;

class ContactService
{
    public function send(array $data)
    {
        // try
        Mail::to(Value::get('email'), Value::get('fantasy_name'))->send(new Contact($data));
    }
}
