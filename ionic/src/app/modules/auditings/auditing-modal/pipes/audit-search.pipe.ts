import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { Auditing } from '../../auditing'

@Pipe({
    name: 'auditSearch'
})
@Injectable()
export class AuditSearchPipe implements PipeTransform {


    transform(options: Auditing[], value: string[]): Auditing[] {
        if (!options || !value || value.every(item => item === '')) {
            return options;
        }

        value = value.map(item => item.toLowerCase())

        return options.filter(item => {
            if (value.every(item => item !== '')) {
                return item.description.toLowerCase().search(value[0]) !== -1 && item.causer.name.toLowerCase().search(value[1]) !== -1
            }

            if(value[0] !== ''){
                return item.description.toLowerCase().search(value[0]) !== -1
            }

            return item.causer.name.toLowerCase().search(value[1]) !== -1
        });

    }
}
