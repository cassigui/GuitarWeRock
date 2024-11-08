<?php

namespace App\Modules\Customers;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class CustomerPolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'customers');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'customers');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'customers');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'customers');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'customers');
    }
}
