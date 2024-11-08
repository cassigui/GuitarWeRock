<?php

namespace App\Modules\PostableTypes;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class PostableTypePolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'postable_types');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'postable_types');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'postable_types');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'postable_types');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'postable_types');
    }
}
