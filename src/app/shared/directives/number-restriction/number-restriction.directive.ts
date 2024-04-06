import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
@Directive({
  selector: '[NumbRestrict]',
})
export class NumberRestrictionDirective {

  constructor(private elementRef: ElementRef,private toastService:ToastService) {}

  @HostListener('keypress', ['$event']) onInput(event) {
    console.log(event)
    var charCode = event.which ? event.which : event.keyCode;


      if (!(charCode > 47 && charCode < 58)) {
        event.preventDefault();
        this.toastService.error('You Should Search with Ids Only')
        return false;
      }
      return true;
    
  }
}
