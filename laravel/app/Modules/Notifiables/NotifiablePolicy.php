<?php

namespace App\Modules\Notifiables;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class NotifiablePolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'notifiables');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'notifiables');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'notifiables');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'notifiables');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'notifiables');
    }
}
