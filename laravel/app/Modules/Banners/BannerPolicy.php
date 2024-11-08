<?php

namespace App\Modules\Banners;

use Illuminate\Foundation\Auth\User;
use App\Modules\Base\BasePolicy;

class BannerPolicy extends BasePolicy
{
    public function view(User $user)
    {
        return $this->can($user, 'view', 'banners');
    }

    public function create(User $user)
    {
        return $this->can($user, 'create', 'banners');
    }

    public function update(User $user)
    {
        return $this->can($user, 'update', 'banners');
    }

    public function delete(User $user)
    {
        return $this->can($user, 'delete', 'banners');
    }

    public function restore(User $user)
    {
        return $this->can($user, 'restore', 'banners');
    }
}
