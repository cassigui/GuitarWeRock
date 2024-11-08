<?php

namespace App\Modules\Dashboard;

use App\Modules\NotificationQueues\NotificationQueueService;

class DashboardService
{
    public function __construct(
        NotificationQueueService $notificationQueueService
    ) {
        $this->notification_queue_service = $notificationQueueService;
    }

    public function getNotificationQueue()
    {
        return [
            'queue'  => $this->notification_queue_service->model->where('sended_at', null)->count(),
            'sended' => $this->notification_queue_service->model->where('sended_at', '!=', null)->count(),
        ];
    }

}
