import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ar } from 'date-fns/locale';

@Directive({
  selector: '[LangRestrict]',
})
export class LanguageRestrictionDirective {
  @Input() LangRestrict = 'ar';
  @Input() Lang = 'ar';

  constructor(private elementRef: ElementRef) {}

  @HostListener('keypress', ['$event']) onInput(event) {
    var charCode = event.which ? event.which : event.keyCode;

    if (this.LangRestrict == 'ar') {
      if (
        !(charCode >= 1569 && charCode <= 1594) &&
        !(charCode <= 45 && charCode >= 40) &&
        !(charCode == 1567) &&
        !(charCode == 95) &&
        !(charCode == 32) &&
        !(charCode >= 1600 && charCode <= 1621) &&
        !(charCode >= 1632 && charCode <= 1641) &&
        !(charCode > 47 && charCode < 58)
      ) {
        event.preventDefault();

        return false;
      }
      return true;
    } else if (this.LangRestrict == 'en') {
      if (
        !(charCode < 123 && charCode > 96) &&
        !(charCode <= 45 && charCode >= 40) &&
        !(charCode == 63) &&
        !(charCode == 95) &&
        !(charCode == 32) &&
        !(charCode < 91 && charCode > 64) &&
        !(charCode > 47 && charCode < 58)
      ) {
        event.preventDefault();
        return false;
      }
      return true;
    } else {
      if (!(charCode > 47 && charCode < 58)) {
        event.preventDefault();
        return false;
      }
      return true;
    }
  }
}
