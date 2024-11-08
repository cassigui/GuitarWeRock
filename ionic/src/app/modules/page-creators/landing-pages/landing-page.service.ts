import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class LandingPageService extends BaseService {

    url = 'landing-pages';

    constructor(injector: Injector) {
        super(injector);
    }

}