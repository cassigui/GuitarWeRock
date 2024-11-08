import { Injectable, Injector } from '@angular/core';

import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class ContactService extends BaseService {
    public url = 'contacts';

    constructor(injector: Injector) {
        super(injector);
    }
}
