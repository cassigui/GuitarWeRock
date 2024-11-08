import { Injectable, Injector } from '@angular/core';

import { BaseService } from 'src/app/base/base.service';

@Injectable({
    providedIn: 'root'
})
export class ConfigService extends BaseService {

    url: string = 'configs';
    singular: string = 'config';
    plural: string = 'configs';

    constructor(injector: Injector) {
        super(injector);
    }

    update(configs: Object): Promise<any> {
        return this.http.put(this.buildUrl(), configs, this.api_token).toPromise();
    }
}
