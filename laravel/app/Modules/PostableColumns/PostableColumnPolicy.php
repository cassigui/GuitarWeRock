<?php

namespace App\Modules\PostableColumns;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class PostableColumnPolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'postable_columns');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'postable_columns');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'postable_columns');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'postable_columns');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'postable_columns');
    }
}
