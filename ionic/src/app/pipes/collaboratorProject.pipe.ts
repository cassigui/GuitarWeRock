import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'collaboratorProject',
  pure: true
})

export class CollaboratorProjectPipe implements PipeTransform {
  transform(options: any[], values: number[]): any {
    let result = null
    if (!options || !values || values.length === 0) {
      return options;
    }
    result = options.reduce(function (previousValue, currentValue) {
      let exist = currentValue.collaborators.map(collaborator => {
        if (values.includes(collaborator.id)) {
          return true;
        }
      })

      if (values.length == 1 && exist.some(item => item == true)) {
        previousValue.push(currentValue);
        return previousValue;
      }

      if (exist.length === values.length && !exist.some(item => item === undefined)) {
        previousValue.push(currentValue);
        return previousValue;
      }
      return previousValue
    }, [])
    if (!result) {
      result = []
    }
    return result
  }

}