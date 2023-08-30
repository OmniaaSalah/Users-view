import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'toLocalDate'
})
export class ToLocalDatePipe implements PipeTransform {

  transform(dateStr: string, format ='YYYY-MM-DD'): unknown {
    dateStr = dateStr.toString()
    let utc = moment.utc(dateStr.split(/[.|+]/)[0]).toDate()

    let localDate = moment(utc).local().format(format) //YYYY-MM-DD HH:mm:ss
    return localDate;
  }

}
