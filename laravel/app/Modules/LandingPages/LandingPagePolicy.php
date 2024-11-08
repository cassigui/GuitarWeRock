<?php

namespace App\Modules\LandingPages;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class LandingPagePolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'landing_pages');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'landing_pages');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'landing_pages');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'landing_pages');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'landing_pages');
    }
}
