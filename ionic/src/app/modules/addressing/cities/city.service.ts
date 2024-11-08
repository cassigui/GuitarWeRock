import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class CityService extends BaseService {
    prefix = 'api';
    url = 'cities';

    constructor(injector: Injector) {
        super(injector);
    }
}
