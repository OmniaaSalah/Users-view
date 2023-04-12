import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapFn'
})
export class WrapFuncPipe implements PipeTransform {

  transform<R>(func: (...arg: any[]) => R, ...args: any[]): R {
    return func(...args);
  }

}
