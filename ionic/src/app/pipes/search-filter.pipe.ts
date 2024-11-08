import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
@Injectable()
export class SearchFilterPipe implements PipeTransform {
  transform(options: any[], value: String): any {
    if (!options || !value) {
        return options;
    }
    return options.filter(item => item.item.name.toLowerCase().search(value.toLowerCase())!==-1);
  }

}
