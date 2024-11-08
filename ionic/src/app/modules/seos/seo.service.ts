import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class SeoService extends BaseService {

    url = 'seos';

    constructor(injector: Injector) {
        super(injector);
    }

}