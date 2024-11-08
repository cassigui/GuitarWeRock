import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class StateService extends BaseService {
    prefix = 'api';
    url = 'states';

    constructor(injector: Injector) {
        super(injector);
    }
}
