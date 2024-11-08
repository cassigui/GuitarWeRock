<?php

namespace App\Modules\Contacts;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class ContactPolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'contacts');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'contacts');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'contacts');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'contacts');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'contacts');
    }
}
