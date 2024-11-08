<?php

namespace App\Modules\Account\Users;

use App\Modules\Collaborators\Collaborator;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    use SoftDeletes;
    use Authorizable;
    // use LogsActivity;

    protected $connection = 'mysql';



    protected $casts = [
        'active' => 'boolean',
    ];

    // protected static $logFillable = true;
    protected static $logAttributes = [
        'name',
        'phone',
        'username',
        'email',
        'access_level_id',
        'active',
        'authenticable_type',
        'authenticable_id',

    ];

    protected $fillable = [
        'name',
        'phone',
        'username',
        'email',
        'access_level_id',
        'active',
        'password',
        'authenticable_type',
        'authenticable_id',

    ];

    protected $hidden = [
        'password',
        'remember_token',
        'super_admin',
    ];

    protected static $logFillable = true;

    public function getDescriptionForEvent(string $eventName): string
    {
        switch ($eventName) {
            case 'created':
                return __('wf.hostings::toasts.store') . "[#{$this->id}]";
                break;

            case 'updated':
                return __('wf.hostings::toasts.update') . "[#{$this->id}]";
                break;

            case 'deleted':
                return __('wf.hostings::toasts.destroy') . "[#{$this->id}]";
                break;

            default:
                return $eventName;
                break;
        }
    }

    public function access_level()
    {
        return $this->belongsTo('App\Modules\Account\Permissions\AccessLevels\AccessLevel');
    }

    public function permissions()
    {
        if (!$this->access_level()->exists()) {
            return [];
        }

        return $this->access_level->permissions()->orderBy('name', 'asc');
    }

    public function getFirstNameAttribute()
    {
        if (empty($this->attributes['name'])) {
            return null;
        }

        return explode(' ', $this->attributes['name'])[0];
    }

    public function authenticable()
    {
        return $this->morphTo();
    }
    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
