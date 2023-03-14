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
  SimpleChanges,
  inject
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { map, Observable, Subject } from 'rxjs';

import {

  CalendarDateFormatter,
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
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ClaimsEnum } from '../../enums/claims/claims.enum';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class CalenderComponent implements OnInit, OnChanges {
  @Input() events: CalendarEvent[]
  @Input() editableEvents: boolean;
  @Input() showActions:boolean = false
  @Output() onEventClicked =new EventEmitter()
  @Output() onEdit =new EventEmitter()
  @Output() onDelete=new EventEmitter()

  lang = inject(TranslationService).lang
  get claimsEnum () {return ClaimsEnum}
  

  counter=0
  faPlus =faPlus
  rerender=true
  
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Week;


  viewDate: Date = new Date();

  locale: string = this.lang;

  refresh = new Subject<void>();

  subjects=[]
  subjectName=''
  eventEditMode =false

  activeDayIsOpen: boolean = true;

  viewPeriod: ViewPeriod;


  constructor(private gradeService:GradesService, private userService:UserService) {}

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['events'].currentValue) {
      this.events = [...changes['events'].currentValue]

      // this.viewPeriod=null
      this.refresh.next()
      console.log(this.events);
      
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



  cellClicked(e){
    
  }





  getTime(date: Date){
    let hours: number = date.getHours();
    let minutes: number |string = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    // minutes = minutes < 10 ? '0' + minutes : minutes;

    // return `${hours}:${minutes}${ampm}`
    return `${hours}:${minutes}`
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  eventClicked(e :CalendarEvent){
    if(!this.userService.isUserAllowedTo(this.claimsEnum.E_U_DivisionLecuture)) return
    this.eventEditMode =true
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
