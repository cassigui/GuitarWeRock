<?php

namespace App\Modules\Seos;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class SeoPolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'seos');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'seos');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'seos');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'seos');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'seos');
    }
}
