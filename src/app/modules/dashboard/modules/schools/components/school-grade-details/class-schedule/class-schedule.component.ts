import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { addHours, addDays, startOfWeek, addMinutes } from 'date-fns';
import { DateValidators } from 'src/app/core/classes/validation';
import { CalendarService } from 'src/app/shared/services/calendar/calendar.service';
import { GradesService } from '../../../services/grade/grade.service';
import { ToastrService } from 'ngx-toastr';
import { map, shareReplay } from 'rxjs';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { GradeCalenderEvent } from 'src/app/core/models/schools/school.model';



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

  getSchoolYearWorkingDays$ = this.gradeService.getSchoolYearWorkingDays().pipe(shareReplay())

  addClassModelOpened=false

    // << DATA >>
    days=this.gradeService.days;
    mode
    eventIdToEdit
    eventIdToDelete

    isSubmitted=false
    sessionTimeForm=this.fb.group({
      day: [null , Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required]
    },{validators: [
        DateValidators.greaterThan('startTime', 'endTime'), 
        DateValidators.dateRange('startTime', 'endTime')
      ]})
  
    get sessionFormCtr () { return this.sessionTimeForm.controls}
  



    events: GradeCalenderEvent[] 


  constructor(
    private calendarService:CalendarService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private gradeService :GradesService,
    private toaster:ToastrService,
    public confirmModelService:ConfirmModelService
  ) { }

  ngOnInit(): void {
    this.getGradeClassEvents()
    this.confirmDeletObsever()
  }

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<  Calender  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  confirmDeletObsever(){
    this.confirmModelService.confirmed$
    .subscribe(isConfirmed=>{
      if(isConfirmed) this.deleteEvent(this.eventIdToDelete)
    })
  }

getGradeClassEvents(){
  this.events=null
  this.gradeService.getGradeClassEvents(this.schoolId,this.gradeId)
  .pipe(
    map(res=> res.map(event => ({...event, start: event.start.split('+')[0], end: event.end.split('+')[0]}))),
    map(res=>{
    return res.map(el => ({...el, start: new Date(el.start), end: new Date(el.end)}))
  }))
  .subscribe((res:GradeCalenderEvent[])=>{
    console.log(res);
    
    this.events = [...res]
  })
}


prepareEventStep(event){
  event.preventDefault()

  let {day,startTime ,endTime} = this.sessionTimeForm.value as any

  let startTimeDate = this.getDate(startTime, day)
  let endTimeDate = this.getDate(endTime, day)  

  
  let calenderEvent: GradeCalenderEvent = {
    start: startTimeDate,
    end : endTimeDate,
    title: '',
    meta:{
      subjects:[]
    }
  }
  
  this.events = [...this.events, calenderEvent]

  if(this.mode=='edit') {
    this.updateClassEvent({ 
      id: this.eventIdToEdit, 
      weekDayId:day, 
      startDate:this.formateDate(startTimeDate), 
      endDate : this.formateDate(endTimeDate),
      title:'',
      meta:''
    })
  } else if(this.mode=='add') {
    this.addClassEvent({ 
      weekDayId:day, 
      startDate: this.formateDate(startTimeDate), 
      endDate : this.formateDate(endTimeDate),
      title:'',
      meta:''
    })
  }


}

formateDate(date :Date){
  let d = new Date(date.setHours(date.getHours() - (date.getTimezoneOffset()/60) )).toISOString()
  return d.split('.')[0]
  
}

addClassEvent(classEvent){
  this.isSubmitted=true
  this.gradeService.addClassEvent(this.schoolId,this.gradeId, classEvent).subscribe(res=>{
    this.getGradeClassEvents()
    this.toaster.success('تم اضافه الحصه بنجاج')
    this.addClassModelOpened=false
      this.isSubmitted=false
  },err=>{
    this.toaster.error('حدث خطأ يرجى المحاوله مره اخرى')
    this.isSubmitted=false
  })
}

updateClassEvent(classEvent){
  this.isSubmitted=true
  this.gradeService.updateClassEvent(this.schoolId,this.gradeId, classEvent).subscribe(res=>{
    this.getGradeClassEvents()
    this.toaster.success('تم تعديل الحصه بنجاج')
    this.addClassModelOpened=false
      this.isSubmitted=false
  },err=>{
    this.toaster.error('حدث خطأ يرجى المحاوله مره اخرى')
    this.isSubmitted=false
  })
}

resetForm(){
  this.sessionTimeForm.reset()
}

onEventEdited(event){
  this.mode='edit'
  this.eventIdToEdit = event.lectureId
  let  localTime=new Date()
  this.addClassModelOpened=true

  this.sessionTimeForm.patchValue({
    // startTime:  new Date(event.start.setHours(event.start.getHours() - localTime.getTimezoneOffset()/60)).toString() as any,
    // endTime: new Date(event.end.setHours(event.end.getHours() - localTime.getTimezoneOffset()/60)).toString() as any,
    // startTime:event.start,
    // endTime:event.end,
    day:event.end.getDay()
  })

  // this.gradeService.updateClassEvent(this.schoolId,event.id).subscribe(res=>{
  //   this.getGradeClassEvents()
  //   this.toaster.success('تم تعديل الحصه بنجاج')

  // })
  
}

deleteEvent(id){
  this.gradeService.deleteClassEvent(id).subscribe(res=>{
    this.getGradeClassEvents()
    this.toaster.success('تم حذف الحصه بنجاج')
  })

}

private getDate(date:Date , dayOfWeek:Day){
  
  const DAY = date.getDay()
  const HOURS = date.getHours()
  const MINUTS = date.getMinutes()
  
  let DATE = new Date(date)
  
  DATE = addDays(startOfWeek(DATE), dayOfWeek)  
  DATE = addHours(DATE,HOURS)
  DATE = addMinutes(DATE,MINUTS)

  return DATE
}



  openAddClassModel() {
    this.addClassModelOpened = true
    this.mode='add'
  }

}
