import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class PostableSectionService extends BaseService {

    url = 'postable-sections';

    constructor(injector: Injector) {
        super(injector);
    }

}