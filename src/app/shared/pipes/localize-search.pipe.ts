import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localizeSearch'
})
export class LocalizeSearchPipe implements PipeTransform {

  transform(items: any[], searchText): unknown {

    if(!items) return []
    if(!searchText) return items
    return items.filter(item =>{
        return Object.keys(item.name).some(key => {
          return String(item.name[key]).toLowerCase().includes(searchText.toLowerCase())
        })
    })
  }

}
