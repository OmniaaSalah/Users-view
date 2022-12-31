import { Directive, Host, HostListener, Self } from '@angular/core';
import { Calendar } from 'primeng/calendar';

@Directive({
  selector: '[useUtc]'
})
export class UseUtcDirective {

  constructor(@Host() @Self() private calendar: Calendar) { }

  @HostListener('onSelect', ['$event']) onSelect() {
    this.toUtc();
  }

  @HostListener('onInput', ['$event']) onInput() {
    this.toUtc();
  }

  private toUtc(){
    let localTime = new Date()
    let val = this.calendar.value
    // this.calendar.value = new Date(val.setHours(val.getHours() - localTime.getTimezoneOffset()/60))
    // this.calendar.value = new Date(Date.UTC(this.calendar.value.getFullYear()
    //   , this.calendar.value.getMonth()
    //   , this.calendar.value.getDate(),
    //   this.calendar.value.getHours(),
    //   this.calendar.value.getMinutes(),
    //   this.calendar.value.getSeconds()
    //   ));
    // console.log(val);
    
    this.calendar.updateModel(this.calendar.value);
  }

}
