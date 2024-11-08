<?php

namespace App\Modules\Customers;

use App\Modules\Addressing\Addresses\Address;
use App\Modules\Contacts\Contact;
use App\Modules\Files\File;
use App\Modules\ThirdParties\ThirdParty;
use App\Modules\Triages\Triage;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use LogsActivity;

    use SoftDeletes;

    protected $fillable = [
        'doc',
        'responsible_name',
        'responsible_phone',
        'corporate_name',
        'fantasy_name',
        'phone',
        'whatsapp',
        'email',
        'tons',
        'notify_whatsapp',
        'notify_email'
    ];

    protected static $logFillable = true;

    public function getDescriptionForEvent(string $eventName): string
    {
        switch ($eventName) {
            case 'created':
                return __('wf.customers::toasts.store') . "[#{$this->id}]";
                break;

            case 'updated':
                return __('wf.customers::toasts.update') . "[#{$this->id}]";
                break;

            case 'deleted':
                return __('wf.customers::toasts.destroy') . "[#{$this->id}]";
                break;

            default:
                return $eventName;
                break;
        }
    }

    public function addresses()
    {
        return $this->morphMany(Address::class, 'addressable');
    }

    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }

    public function triages(){
        return $this->hasMany(Triage::class);
    }

    public function third_parties(){
        return $this->belongsToMany(ThirdParty::class, 'customer_third_party', 'customer_id');
    }

    public function contacts(){
        return $this->hasMany(Contact::class, 'customer_id');
    }
}
