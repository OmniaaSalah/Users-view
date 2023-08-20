import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';

@Pipe({
  name: 'excludeEmptyList'
})
export class ExcludeEmptyListPipe implements PipeTransform {

  constructor(private userService:UserService){}

  transform(array: any[], keyName:string): unknown {

    if(!array || !array?.length) return []

    let filterdArr =  array.filter(item => {

      return (item[keyName] as Array<any>).some(el=> {

        if(!el?.claims || !el?.claims?.length) return true

        return this.userService.isUserAllowedTo(el?.claims)
      })
    })

    return filterdArr;
  }

}
