import { Directive, Host, HostListener, Self } from '@angular/core';
import { Calendar } from 'primeng/calendar';

@Directive({
  selector: '[useUtc]'
})
export class UseUtcDirective {

  constructor(@Host() @Self() private calendar: Calendar) { }

  @HostListener('onSelect', ['$event']) onSelect() {
    this.toUtc();
    console.log(this.calendar.value,'onSelect');
  }

  @HostListener('onInput', ['$event']) onInput() {
    this.toUtc();
    console.log(this.calendar.value,'onInput');
    
  }

  private toUtc(){
    // this.calendar.value =new Date(this.calendar.value.getTime() - (this.calendar.value.getTimezoneOffset() * 60 * 1000))
    // this.calendar.value = new Date(Date.UTC(this.calendar.value.getFullYear()
    //   , this.calendar.value.getMonth()
    //   , this.calendar.value.getDate(),
    //   this.calendar.value.getHours(),
    //   this.calendar.value.getMinutes(),
    //   this.calendar.value.getSeconds()
    //   ));
    this.calendar.updateModel(this.calendar.value);
  }

}
