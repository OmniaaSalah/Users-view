import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CalendarEvent,DAYS_OF_WEEK } from 'angular-calendar';
import { subDays, addHours, startOfDay, endOfMonth, addDays, startOfWeek, addMinutes } from 'date-fns';
import { DateValidators } from 'src/app/core/classes/validation';
import { CalendarService } from 'src/app/shared/services/calendar/calendar.service';
import { GradesService } from '../../../services/grade/grade.service';
import { RRule } from 'rrule';
import { RecurringEvent } from 'src/app/core/models/calendar/calendar';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.scss']
})
export class ClassScheduleComponent implements OnInit {

    // << ICONS >>
    faPlus = faPlus
    faCheck = faCheck

    
	schoolId = this.route.snapshot.paramMap.get('schoolId')
  gradeId = this.route.snapshot.paramMap.get('gradeId')

  addClassModelOpened=false

    // << DATA >>
    days=this.gradeService.days;
  
  
    sessionTimeForm=this.fb.group({
      day: [null , Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required]
    },{validators: [
        DateValidators.greaterThan('startTime', 'endTime'), 
        DateValidators.dateRange('startTime', 'endTime')
      ]})
  
    get sessionFormCtr () { return this.sessionTimeForm.controls}
  

    // events:RecurringEvent[]=[
    //   {
    //     // title: 'Recurs weekly on mondays',
    //     // color:  { ...this.calendarService.colors['red'] },
    //     start:subDays(addHours(startOfDay(new Date()), 8), 2),
    //     end:subDays(addHours(startOfDay(new Date()), 9), 2),
    //     rrule: {
    //       freq: RRule.WEEKLY,
    //       byweekday: [RRule.TH],
    //       // dtstart: subDays(addHours(startOfDay(new Date()), 8), 2),
    //       // until: subDays(addHours(startOfDay(new Date()), 9), 2)
    //     }
    //   },
    //   {
    //     // title: 'Recurs weekly on mondays',
    //     // color:  { ...this.calendarService.colors['red'] },
    //     start:addDays(addHours(startOfDay(new Date()), 8), 2),
    //     end:addDays(addHours(startOfDay(new Date()), 9), 2),
    //     rrule: {
    //       freq: RRule.WEEKLY,
    //       byweekday: [RRule.MO],
    //       // dtstart: addDays(addHours(startOfDay(new Date()), 8), 2),
    //       // until: addDays(addHours(startOfDay(new Date()), 9), 2)
    //     }
    //   },
    //   {
    //     // title: 'Recurs weekly on mondays',
    //     // color:  { ...this.calendarService.colors['red'] },
    //     start:addDays(addHours(startOfDay(new Date()), 10), 1),
    //     end:addDays(addHours(startOfDay(new Date()), 11), 1),
    //     rrule: {
    //       freq: RRule.WEEKLY,
    //       byweekday: [RRule.TU],
    //       // dtstart: addDays(addHours(startOfDay(new Date()), 10), 1),
    //       // until: addDays(addHours(startOfDay(new Date()), 11), 1)
    //     }
    //   }
    // ]

    events: CalendarEvent[] = [
      {
        id:'1',
        start: subDays(addHours(startOfDay(new Date()), 8), 2),
        end: subDays(addHours(startOfDay(new Date()), 9), 2),
        title: 'A 3 day event',
        meta:{
          subjects:['رياضيات','علوم']
        }
      },
      {  
        start: subDays(addHours(startOfDay(new Date()), 2), 1),
        end: addHours(new Date(), 2),
        title: 'A 3 day event',
      },
      {
        start: startOfDay(new Date()),
        title: 'An event with no end date',

      },
      {
        start: subDays(endOfMonth(new Date()), 3),
        end: addDays(endOfMonth(new Date()), 3),
        title: 'A long event that spans 2 months',
        allDay: true,
      },
      {
        start: addHours(startOfDay(new Date()), 5),
        end: addHours(new Date(), 2),
        title: 'A draggable and resizable event',
      },
    ];


  constructor(
    private calendarService:CalendarService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private gradeService :GradesService,
    private toaster:ToastrService
  ) { }

  ngOnInit(): void {
  }

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<  Calender  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

disabledDates=[new Date().setHours(5)]

getClass(){

}
isSubmitted=false

addClassSchedule(event){
  event.preventDefault()
  this.isSubmitted=true

  this.addClassModelOpened=false

  const {startTime ,endTime , day} = this.sessionTimeForm.value as any
  
  let startTimeDate = this.getDate(startTime, day.index)
  let endTimeDate = this.getDate(endTime, day.index)

  let classEvent: CalendarEvent = {
    start: startTimeDate,
    end : endTimeDate,
    title: 'Math Class',
    meta:{
      subjects:[]
    }
  }
  
  this.events = [...this.events, classEvent]
  this.toaster.success('تم اضافه الحصه بنجاج')
  this.gradeService.addClassSchedule(this.schoolId,this.gradeId, classEvent).subscribe(res=>{
      this.isSubmitted=false
  })
}



getDate(date:Date , dayOfWeek:Day){
  
  const DAY = date.getDay()
  console.log(DAY ,'>', dayOfWeek);
  const HOURS = date.getHours()
  const MINUTS = date.getMinutes()
  // const MOUNTH = date.getMonth()


  // let newDate = new Date()
  // newDate .setDate(day)
  // newDate.setHours(HOURS)
  // newDate.setMinutes(MINUTS)
  // newDate.setMonth(MOUNTH)
   

  let DATE = new Date(date)
  DATE = addDays(startOfWeek(DATE), dayOfWeek) 
  DATE = addHours(DATE,HOURS)
  DATE = addMinutes(DATE,MINUTS)
  

console.log(DATE);

  return DATE
}


// sessionForm(){

// }


selectedStartTime() {

}
selectedEndTime() {

}

openAddClassModel() {
  this.addClassModelOpened = true
}

}
