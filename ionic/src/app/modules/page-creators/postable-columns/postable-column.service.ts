import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class PostableColumnService extends BaseService {

    url = 'postable-columns';

    constructor(injector: Injector) {
        super(injector);
    }

}