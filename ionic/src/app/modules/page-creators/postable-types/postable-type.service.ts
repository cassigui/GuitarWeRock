import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class PostableTypeService extends BaseService {

    url = 'postable-types';

    constructor(injector: Injector) {
        super(injector);
    }

}