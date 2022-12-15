import { inject, Injectable } from "@angular/core"
import { SharedService } from "src/app/shared/services/shared/shared.service"
@Injectable()
export class ArrayOperations{


  static  arrayOfStringsToObject(array:any[]):{[key in string]:any}{
    return Object.assign({}, ...array?.map((item:any) => ({[item]: item})))
  }
  
  
  
  static filledObjectItemsCount(obj:{}):number{
      const items = ['KeyWord','SortBy','PageSize','SortColumn','SortDirection','Page']
      let count=0

      for(let i in obj){
        if(!items.includes(i)) {          
          if(obj[i]) count++
        }
      }
      return count
    }


}