import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class CountryService extends BaseService {
    prefix = 'api';
    url = 'countries';

    constructor(injector: Injector) {
        super(injector);
    }
}
