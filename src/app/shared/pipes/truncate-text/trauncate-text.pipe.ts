import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TrauncateTextPipe implements PipeTransform {

  transform(value: string, limit: number=20, trail ='....'): string {
    if(value.length <= limit) return value
     value = value.substring(0, limit) + trail
    return value
  }

}
