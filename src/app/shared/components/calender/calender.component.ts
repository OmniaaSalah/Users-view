import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { map, Subject } from 'rxjs';

import {

  CalendarDayViewBeforeRenderEvent,
  CalendarEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent,
} from 'angular-calendar';

import { CalendarService } from '../../services/calendar/calendar.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CustomDateFormatter } from '../../services/calendar-localization/date-formater.provider';
import { RRule } from 'rrule';
import { ViewPeriod } from 'calendar-utils';
import moment from 'moment-timezone';
import { RecurringEvent } from 'src/app/core/models/calendar/calendar';
import { Calendar } from 'primeng/calendar';
import { GradesService } from 'src/app/modules/dashboard/modules/schools/services/grade/grade.service';
import { WeekDays } from '../../enums/global/global.enum';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // {
    //   provide: CalendarDateFormatter,
    //   useClass: CustomDateFormatter,
    // },
  ],
})
export class CalenderComponent implements OnInit, OnChanges {
  @Input() events: CalendarEvent[]
  @Input() editableEvents: boolean;
  @Input() showActions:boolean = false
  @Output() onEventClicked =new EventEmitter()
  @Output() onEdit =new EventEmitter()
  @Output() onDelete=new EventEmitter()

  counter=0
  faPlus =faPlus
  rerender=true
  
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Week;


  viewDate: Date = new Date();

  locale: string = 'ar';

  refresh = new Subject<void>();

  subjects=[]
  subjectName=''
  eventEditMode =false

  activeDayIsOpen: boolean = true;

  calendarEvents: CalendarEvent[] = [];

  viewPeriod: ViewPeriod;


  constructor(private gradeService:GradesService) {}

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['events'].currentValue) {
      this.events = [...changes['events'].currentValue]

      // this.viewPeriod=null
      this.refresh.next()

    }

    
  }
  excludeDays
  weekDays =[0,1,2,3,4,5,6]

  ngOnInit(): void {

    this.gradeService.getSchoolYearWorkingDays()
    .pipe(map(res=> res.map(el=> el.day)))
    .subscribe((workDays: WeekDays[])=>{
      this.excludeDays = this.weekDays.filter(day => !workDays.includes(day))
    })
  }

  // updateCalendarEvents(
  //   viewRender:
  //     | CalendarMonthViewBeforeRenderEvent
  //     | CalendarWeekViewBeforeRenderEvent
  //     | CalendarDayViewBeforeRenderEvent
  // ): void {

    
  //   if (
  //     !this.viewPeriod ||
  //     !moment(this.viewPeriod.start).isSame(viewRender.period.start) ||
  //     !moment(this.viewPeriod.end).isSame(viewRender.period.end)
  //   ) {
  //     this.viewPeriod = viewRender.period;
  //     this.calendarEvents = [];

  //     this.events.forEach((event) => {
  //       const rule: RRule = new RRule({
  //         ...event.rrule,
  //         dtstart: new Date(),
  //         until: new Date(2023, 2, 17),
  //       });
  //       const { title, color } = event;
        
  //       rule.all().forEach((date) => {
          
  //         this.calendarEvents.push({
  //           title,
  //           color,
  //           start: moment(moment(date).hour(event.start.getHours())).toDate(),
  //           end: moment(moment(date).hour(event.end.getHours())).toDate(),
  //         });
  //       });
  //     });
  //     this.cdr.detectChanges();
      
  //   }
  // }



  cellClicked(e){
    
  }





  getTime(date: Date){
    let hours: number = date.getHours();
    let minutes: number |string = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutes}${ampm}`
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  eventClicked(e :CalendarEvent){
    this.eventEditMode =true
    console.log(e);

    if(this.editableEvents) this.onEventClicked.emit(e)
    
  }

  addSubject(subjectName){
    
    this.subjects.push(subjectName)
    this.subjectName=''
  }


    // dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  //   if (isSameMonth(date, this.viewDate)) {
  //     if (
  //       (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
  //       events.length === 0
  //     ) {
  //       this.activeDayIsOpen = false;
  //     } else {
  //       this.activeDayIsOpen = true;
  //     }
  //     this.viewDate = date;
  //   }
  // }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
