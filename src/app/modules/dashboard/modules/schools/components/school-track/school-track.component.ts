import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import {  faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { CalendarEvent } from 'angular-calendar';
import {  addHours, startOfDay, addDays } from 'date-fns';
import { HeaderObj } from 'src/app/core/Models/header-obj';
import { paginationState } from 'src/app/core/Models/pagination/pagination';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { CalendarService } from 'src/app/shared/services/calendar/calendar.service';

@Component({
  selector: 'app-school-track',
  templateUrl: './school-track.component.html',
  styleUrls: ['./school-track.component.scss']
})
export class SchoolTrackComponent implements OnInit {

  // << ICONS >> //
  faCheck = faCheck


  // << DASHBOARED HEADER DATA >> //
  componentHeaderData: HeaderObj={
		breadCrump: [
      {label:'قائمه المدارس '},
      {label:'الاطلاع على معلومات المدرسه'},
      {label:'تعديل الشعبه'},
		],
		mainTitle:{ main: 'مدرسه الشارقه الابتدائيه' },
    subTitle: {main: this.translate.instant('dashboard.schools.editTrack'), sub:'(B 1)'}
	}


  // << CONDITIONS >> //
  searchText=''
  isModelOpened
  openSubjectsModel=false
  step =1
	first=0
	rows =4

  // << DATA >> //
  selectedSubjects=[]
  eventSubjects=[]
  selectedEventId

  schoolClasses:any[] =[
    {
    "id": "1000",
    "code": "f230fh0g3",
    "name": "Bamboo Watch",
    "description": "Product Description",
    "image": "bamboo-watch.jpg",
    "price": 65,
    "category": "Accessories",
    "quantity": 24,
    "inventoryStatus": "INSTOCK",
    "rating": 5
  },
  {
    "id": "1000",
    "code": "f230fh0g3",
    "name": "Bamboo Watch",
    "description": "Product Description",
    "image": "bamboo-watch.jpg",
    "price": 65,
    "category": "Accessories",
    "quantity": 24,
    "inventoryStatus": "INSTOCK",
    "rating": 5
  },
  {
    "id": "1001",
    "code": "nvklal433",
    "name": "Black Watch",
    "description": "Product Description",
    "image": "black-watch.jpg",
    "price": 72,
    "category": "Accessories",
    "quantity": 61,
    "inventoryStatus": "INSTOCK",
    "rating": 4
  },
  {
    "id": "1001",
    "code": "nvklal433",
    "name": "Black Watch",
    "description": "Product Description",
    "image": "black-watch.jpg",
    "price": 72,
    "category": "Accessories",
    "quantity": 61,
    "inventoryStatus": "INSTOCK",
    "rating": 4
  },
  {
    "id": "1000",
    "code": "f230fh0g3",
    "name": "Bamboo Watch",
    "description": "Product Description",
    "image": "bamboo-watch.jpg",
    "price": 65,
    "category": "Accessories",
    "quantity": 24,
    "inventoryStatus": "INSTOCK",
    "rating": 5
  },
  {
    "id": "1001",
    "code": "nvklal433",
    "name": "Black Watch",
    "description": "Product Description",
    "image": "black-watch.jpg",
    "price": 72,
    "category": "Accessories",
    "quantity": 61,
    "inventoryStatus": "INSTOCK",
    "rating": 4
  },
  {
    "id": "1000",
    "code": "f230fh0g3",
    "name": "Bamboo Watch",
    "description": "Product Description",
    "image": "bamboo-watch.jpg",
    "price": 65,
    "category": "Accessories",
    "quantity": 24,
    "inventoryStatus": "INSTOCK",
    "rating": 5
  },
  {
    "id": "1001",
    "code": "nvklal433",
    "name": "Black Watch",
    "description": "Product Description",
    "image": "black-watch.jpg",
    "price": 72,
    "category": "Accessories",
    "quantity": 61,
    "inventoryStatus": "INSTOCK",
    "rating": 4
  },
  {
    "id": "1002",
    "code": "zz21cz3c1",
    "name": "Blue Band",
    "description": "Product Description",
    "image": "blue-band.jpg",
    "price": 79,
    "category": "Fitness",
    "quantity": 2,
    "inventoryStatus": "LOWSTOCK",
    "rating": 3
  },
  {
    "id": "1003",
    "code": "244wgerg2",
    "name": "Blue T-Shirt",
    "description": "Product Description",
    "image": "blue-t-shirt.jpg",
    "price": 29,
    "category": "Clothing",
    "quantity": 25,
    "inventoryStatus": "INSTOCK",
    "rating": 5
  },
  {
    "id": "1004",
    "code": "h456wer53",
    "name": "Bracelet",
    "description": "Product Description",
    "image": "bracelet.jpg",
    "price": 15,
    "category": "Accessories",
    "quantity": 73,
    "inventoryStatus": "INSTOCK",
    "rating": 4
  },
  {
    "id": "1005",
    "code": "av2231fwg",
    "name": "Brown Purse",
    "description": "Product Description",
    "image": "brown-purse.jpg",
    "price": 120,
    "category": "Accessories",
    "quantity": 0,
    "inventoryStatus": "OUTOFSTOCK",
    "rating": 4
  },
  {
    "id": "1006",
    "code": "bib36pfvm",
    "name": "Chakra Bracelet",
    "description": "Product Description",
    "image": "chakra-bracelet.jpg",
    "price": 32,
    "category": "Accessories",
    "quantity": 5,
    "inventoryStatus": "LOWSTOCK",
    "rating": 3
  },
  {
    "id": "1007",
    "code": "mbvjkgip5",
    "name": "Galaxy Earrings",
    "description": "Product Description",
    "image": "galaxy-earrings.jpg",
    "price": 34,
    "category": "Accessories",
    "quantity": 23,
    "inventoryStatus": "INSTOCK",
    "rating": 5
  }
  ]

  events: CalendarEvent[] = [
    {
      id:'1',
      start: addDays(addHours(startOfDay(new Date()), 10), 3),
      end: addDays(addHours(startOfDay(new Date()), 11), 3),
      title: 'A 3 day event',
      color: { ...this.calendarService.colors['red'] },
      actions: this.calendarService.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      meta:{
        subjects:[]
      }
    },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: { ...this.calendarService.colors['yellow'] },
    //   actions: this.calendarService.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: { ...this.calendarService.colors['blue'] },
    //   allDay: true,
    // },
    {
      id:"2",
      start: addHours(startOfDay(new Date()), 9),
      end: addHours(startOfDay(new Date()), 13),
      title: 'A draggable and resizable event',
      color: { ...this.calendarService.colors['yellow'] },
      actions: this.calendarService.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
      meta:{
        subjects:[]
      }
    },
  ];

  subjectsTeachers=[
    {teatcher:{name: 'عادل'},subject:'الرياضيات'},
    {teatcher:{name: 'محمد'},subject:'احياء'},
    {teatcher:{name: 'تميم'},subject:'علم نفس'},
  ]

  selectedTracks=[]
  AllTracks=[
    {id:1, name: 'علمى',},
    {id:2, name: 'ادبى'},
    {id:3, name: 'علوم تجريبية'},
    {id:4, name: 'سياسه واقتصاد'}
  ]

  track={
    id:12321,
    class: {name:'الرابع'},
    maxStudentNumber:300,
    name:'B1',
    forSpecialAbilities:false,
    tracks:[{id:1, name: 'علمى'} ,{id:2, name: 'ادبى'}],
    manager: {name:'محمد القادر'},
    addDegreesAvilability:true,
    teachers: [
      {teacher:{name: 'عادل'},subject:'الرياضيات'},
      {teacher:{name: 'محمد'},subject:'احياء'},
      {teacher:{name: 'تميم'},subject:'علم نفس'},
    ]
  }



  // << FORMS >> //
  trackForm= this.fb.group({
    id:[],
    class:[],
    maxStudentNumber:[],
    name:[],
    forSpecialAbilities:[],
    tracks: this.fb.array([]),
    manager:[],
    addDegreesAvilability:[],
    teachers: this.fb.array([]),

  })

  addStudentForm= this.fb.group({
    student:[],
    track:[],
    subjects:[[]]
  })

  // << FORM CONTROLS >> //
  get teachers (){ return this.trackForm.controls['teachers'] as FormArray}
  get tracks (){ return this.trackForm.controls['tracks'] as FormArray}


  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private calendarService:CalendarService,
    private fb : FormBuilder
  ) { }

  ngOnInit(): void {

    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.initForm()
  }


  initForm(){
    this.selectedTracks.push(...this.track.tracks)

    this.trackForm.patchValue({...this.track})
    
    this.fillTeachres()
    console.log(this.trackForm.value);
    
  }

  fillTeachres(){
    this.subjectsTeachers.forEach(el =>{
      this.teachers.push(this.fb.group({
        teacher:[el.teatcher],
        subject:[el.subject]
      }))
    })
  }


// << CALENDAR METHODS >> //
  eventClicked(e){
    this.selectedEventId=e.id
    this.openSubjectsModel=true
  }

  addSubjectsToCalendarEvent(event:Event, id){
    event.preventDefault()
    let selectedEvent = this.events.find((e)=> e.id == id)
    selectedEvent.meta.subjects = [...selectedEvent.meta.subjects,...this.eventSubjects]
    this.events = [...this.events]
    
    this.openSubjectsModel = false
  }



  submitTracksForm(){

  }

  openAddStudentModel(){
		this.isModelOpened=true
	}

	paginationChanged(event:paginationState){
		console.log(event);
		this.first = event.first
		this.rows = event.rows

	}

}
