<?php

namespace App\Modules\PostableSections;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class PostableSectionPolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'postable_sections');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'postable_sections');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'postable_sections');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'postable_sections');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'postable_sections');
    }
}
