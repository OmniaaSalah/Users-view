import { Injectable } from "@angular/core"
@Injectable()
export class ArrayOperations{


  static  arrayOfStringsToObject(array:any[]):{[key in string]:any}{
    return Object.assign({}, ...array?.map((item:any) => ({[item]: item})))
  }
  
  
  
  static filledObjectItemsCount(obj:{}):number{
      const items = ['KeyWord','SortBy','PageSize','SortColumn','SortDirection','Page','CurriculumName']
      let count=0

      for(let i in obj){
        if(!items.includes(i)) {          
          if(obj[i] || obj[i]=='0' || obj[i]=='false') count++
        }
      }
      return count
    }


}




