import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Pipe({
  name: 'LocalizeDate'
})
export class LocalizeDatePipe implements PipeTransform {

  constructor(private translationService:TranslationService){}

  transform(value: Date | string, format = "d MMMM y "): string {

    const datePipe = new DatePipe(this.translationService.lang ||  'ar');
    return datePipe.transform(value, format);
  }

}
