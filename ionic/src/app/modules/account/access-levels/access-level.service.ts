import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class AccessLevelService extends BaseService {

    public url: string = 'access-levels';
    public prefix: string = 'wf-api';

    constructor(injector: Injector) {
        super(injector);
    }
}
