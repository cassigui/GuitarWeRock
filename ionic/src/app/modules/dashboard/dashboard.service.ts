import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends BaseService {

    url = 'dashboard';

    constructor(injector: Injector) {
        super(injector);
    }

    getNotificationQueue() {
        return this.http.get(this.buildUrl('/dashboard-notification-queues?token='+this.api_token_value)).toPromise();
    }
}
