import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faArrowLeft, faArrowRight, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { CalendarEvent } from 'angular-calendar';
import { addDays, addHours, addMinutes, endOfMonth, startOfDay, startOfWeek, subDays } from 'date-fns';
import { MenuItem } from 'primeng/api';
import { HeaderObj } from 'src/app/core/models/header-obj';
import { HeaderService } from 'src/app/core/services/header/header.service';

export interface Subject{
  name:string
  mandatory:boolean
  inFinalScore:boolean
}

export interface Track{
  name:string
  subjects: Subject[]
}
@Component({
  selector: 'app-school-class',
  templateUrl: './school-class.component.html',
  styleUrls: ['./school-class.component.scss']
})
export class SchoolClassComponent implements OnInit {

  // << ICONS >>
  faArrowLeft = faArrowLeft
  faArrowRight = faArrowRight
  faPlus = faPlus
  faCheck = faCheck


  // << DASHBOARD HEADER DATA >>
  componentHeaderData: HeaderObj={
		breadCrump: [
      {label:'قائمه المدارس '},
      {label:'الاطلاع على معلومات المدرسه'},
      {label:'تعديل صف'},
		],
		mainTitle:{ main: 'مدرسه الشارقه الابتدائيه' },
    subTitle: {main: this.translate.instant('dashboard.schools.editClass') , sub:'(الصف الرابع)'}
	}



  // << DATA >>
  days=[
    {name: 'السبت', index: 6},
    {name: 'الاحد', index: 0},
    {name: 'الاتنين', index: 1},
    {name: 'الثلاثاء', index: 2},
    {name: 'الاربعاء', index: 3},
    {name: 'الخميس', index: 4},
  ]

  tracks:Track[] =[
    {
      name:'علمى',
      subjects:[
        {name :"الرياضيات", mandatory:true, inFinalScore:false}
      ]
    },
    {
      name:'ادبى',
      subjects:[
        {name :"تاريخ", mandatory:true, inFinalScore:false},
        {name :"تاريخ", mandatory:true, inFinalScore:false}
      ]
    },
    {
      name:'علمى',
      subjects:[
        {name :"الرياضيات", mandatory:true, inFinalScore:false},
        {name :"الرياضيات", mandatory:true, inFinalScore:false},
        {name :"الرياضيات", mandatory:true, inFinalScore:false}
      ]
    },
  ]

  subjects=[
    {name :"الرياضيات", mandatory:true, inFinalScore:false},
    {name :"الاحياء", mandatory:true, inFinalScore:false},
    {name :"العلوم", mandatory:true, inFinalScore:false}
  ]

  classTimeForm= {
    day: null,
    startTime: null,
    endTime: null
  }

  events: CalendarEvent[] = [
    {
      start: subDays(addHours(startOfDay(new Date()), 2), 1),
      end: addHours(new Date(), 2),
      title: 'A 3 day event',
      color: { ...this.calendarService.colors['red'] },
      actions: this.calendarService.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...this.calendarService.colors['yellow'] },
      actions: this.calendarService.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...this.calendarService.colors['blue'] },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 5),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...this.calendarService.colors['yellow'] },
      actions: this.calendarService.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];



  // << CONDITIONS >>
  step=2
  withTracks = false
  addClassModelOpened=false

    
  
  // << FORMS >>
  classForm= this.fb.group({
    name: [''],
    descriptionAvilibilty:[''],
    classSchedule:[],
    tracks: this.fb.array([]),
    subjects:this.fb.array([])
  })

  // << FORM CONTROLS >> //
  get classTracks(){ return this.classForm.controls['tracks'] as FormArray }
  getClassTrack = (index) => (this.classTracks.controls[index] as FormGroup)
  getTrackSubjects = (index) => (this.getClassTrack(index).controls['subjects'] as FormArray)
  get classSubjects(){ return this.classForm.controls['subjects'] as FormArray }
  

  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private calendarService:CalendarService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)

    this.initForm()
       
  }


  // << FORM METHODS >> //
  initForm(){    
    if(this.withTracks) this.fillTracks()
    else this.fillSubjects()
  }

  fillTracks(){    
    this.tracks.forEach((el, index) => {
      this.classTracks.push(this.fb.group({
        name:[el.name],
        subjects: this.fillTrackSubjects(index, el.subjects)
      }))
    })
    
  }

  fillTrackSubjects(trackIndex, subjects: Subject[]){
    let trackSubjectsArr = this.fb.array([]) as FormArray
    subjects.forEach(subject =>{
      trackSubjectsArr.push(this.fb.group({
        name:[subject.name],
        mandatory:[subject.mandatory],
        inFinalScore:[subject.inFinalScore]
      }))
    })

    return trackSubjectsArr
  }

  fillSubjects(){
    this.subjects.forEach(subject =>{
      this.classSubjects.push(this.fb.group({
          name:[subject.name],
          mandatory:[subject.mandatory],
          inFinalScore:[subject.inFinalScore]
        })
      )

    })
  }

  newTrackGroup(){
    return this.fb.group({
      name: '',
      subjects: this.fb.array([])
    })
  }

  newSubjectGroup(){
    return this.fb.group({
      name:[''],
      mandatory:[''],
      inFinalScore:['']
    })
  }

  addTrack(){
    this.classTracks.push(this.newTrackGroup())
  }

  addSubjectToTrack(trackId){
    this.getTrackSubjects(trackId).push(this.newSubjectGroup())
  }

  addSubject(){
    this.classSubjects.push(this.newSubjectGroup())
  }




  disabledDates=[new Date().setHours(5)]

  addClassStudy(){
    this.addClassModelOpened=false

    const {startTime ,endTime , day} = this.classTimeForm
    
    let startTimeDate = this.getDate(startTime, day.index)
    let endTimeDate = this.getDate(endTime, day.index)


    let classEvent: CalendarEvent = {
      start: startTimeDate,
      end : endTimeDate,
      title: 'Math Class'
    }
    
    this.events = [...this.calendarService.addEvent(this.events, classEvent)]
  }


  getDate(date:Date , day:Day){
    const DAY = date.getDay()
    const HOURS = date.getHours()
    const MINUTS = date.getMinutes()

    let DATE = new Date(date)

    if(DAY >= day) DATE = addDays(startOfWeek(DATE), day)
    else DATE = subDays(startOfWeek(DATE), day)
    
    DATE = addHours(DATE,HOURS)
    DATE = addMinutes(DATE,MINUTS)

    return DATE
  }


  submitClassForm(){

  }


  selectedStartTime() {

  }
  selectedEndTime() {

  }

  openAddClassModel() {
    this.addClassModelOpened = true
  }
}
