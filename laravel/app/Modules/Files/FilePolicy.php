<?php

namespace App\Modules\Files;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class FilePolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'files');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'files');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'files');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'files');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'files');
    }
}
