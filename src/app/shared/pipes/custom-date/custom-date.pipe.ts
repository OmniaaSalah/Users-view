import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe  implements PipeTransform {
  // transform(value: any, args?: any): any {
  //   return super.transform(value, "EEEE d MMMM y h:mm a");
  // }

  constructor(private translationService:TranslationService){}

  transform(value: Date | string, format = "d MMMM y h:mm a "): string {

    const datePipe = new DatePipe(this.translationService.lang ||  'ar');
    return datePipe.transform(value, format);
  }
}

