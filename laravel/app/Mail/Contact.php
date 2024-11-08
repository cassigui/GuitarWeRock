<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Contact extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(array $data)
    {
        $this->data = [
            'subject' => $data['subject'],
            'name'    => $data['name'],
            'message' => $data['message'],
            'lot_id'  => $data['lot_id'],
        ];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $data = $this->data;

        return $this
            ->from('base@wfloat.com.br', 'Base')
            ->subject($this->data['subject'])
            ->view('mail.contact', compact('data'));
    }
}
