import { Component, OnInit ,inject} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faPlus, faClose } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { CalendarEvent } from 'angular-calendar';
import { addDays, addHours, startOfDay, subDays } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { CalendarService } from 'src/app/shared/services/calendar/calendar.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { DivisionService } from '../../services/division/division.service';
import { SchoolsService } from '../../services/schools/schools.service';

@Component({
  selector: 'app-school-division',
  templateUrl: './school-division.component.html',
  styleUrls: ['./school-division.component.scss']
})
export class SchoolDivisionComponent implements OnInit {

 // << ICONS >> //
 faPlus =faPlus
 currentUserScope = inject(UserService).getCurrentUserScope()
 lang = inject(TranslationService).lang
 get userScope() { return UserScope };
 currentSchool="";
 get claimsEnum () {return ClaimsEnum}

 schoolId = this.route.snapshot.paramMap.get('schoolId')
 divisionId = this.route.snapshot.paramMap.get('divisionId')
 gradeId


 // << DASHBOARED HEADER DATA >> //
 componentHeaderData: IHeader={
   breadCrump: [],
   mainTitle:{ main:this.currentSchool },
   subTitle: {main: this.translate.instant('dashboard.schools.editTrack'), sub:'(B 1)'}
 }




 // << CONDITIONS >> //
 searchText=''
 addStudentModelOpened = false
 openSubjectsModel=false
 addStudentsModelOpened=false
 transferStudentModelOpened=false
 absenceModelOpened=false
 degreeseModelOpened=false

 step =1

 // << DATA SOURCE >> //
 divisionInfo
 divisionTeachers
 tracks$=this.divisionService.getDivisionTracks(this.divisionId)
 studentsWithoutDivision$
 optionalSubjects$

 selectedSubjects=[]
 eventSubjects=[]
 selectedEventId

 selectedStudents=[]

 schoolClasses:any[] =[

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
 ]

 events: CalendarEvent[] = [
   {
     id:'1',
     start: addDays(addHours(startOfDay(new Date()), 10), 1),
     end: addDays(addHours(startOfDay(new Date()), 11), 1),
     title: 'A 3 day event',
     color: { ...this.calendarService.colors['red'] },
     actions: this.calendarService.actions,
     resizable: {
       beforeStart: true,
       afterEnd: true,
     },
     draggable: true,
     meta:{
       subjects:['رياضيات','علوم']
     }
   },
   {
     id:'2',
     start: subDays(addHours(startOfDay(new Date()), 10), 1),
     end: subDays(addHours(startOfDay(new Date()), 12), 1),
     title: 'A 3 day event',
     color: { ...this.calendarService.colors['red'] },
     actions: this.calendarService.actions,
     resizable: {
       beforeStart: true,
       afterEnd: true,
     },
     draggable: true,
     meta:{
       subjects:['احياء','جولوجيا']
     }
   },
   {
     id:'3',
     start: subDays(addHours(startOfDay(new Date()), 8), 2),
     end: subDays(addHours(startOfDay(new Date()), 9), 2),
     title: 'A 3 day event',
     color: { ...this.calendarService.colors['red'] },
     actions: this.calendarService.actions,
     resizable: {
       beforeStart: true,
       afterEnd: true,
     },
     draggable: true,
     meta:{
       subjects:['رياضيات','علوم']
     }
   },
   {
     id:'4',
     start: subDays(addHours(startOfDay(new Date()), 9), 3),
     end: subDays(addHours(startOfDay(new Date()), 10), 3),
     title: 'A 3 day event',
     color: { ...this.calendarService.colors['red'] },
     actions: this.calendarService.actions,
     resizable: {
       beforeStart: true,
       afterEnd: true,
     },
     draggable: true,
     meta:{
       subjects:['كمياء','عربى']
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
     id:"5",
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
       subjects:['علم نفس','فزياء']
     }
   },
 ];

 subjectsTeachers=[
   {teatcher:{name: 'عادل'},subject:'الرياضيات'},
   {teatcher:{name: 'محمد'},subject:'احياء'},
   {teatcher:{name: 'تميم'},subject:'علم نفس'},
 ]



 track={
   id:12321,
   manager: {name:'محمد القادر'},
   addDegreesAvilability:true,
   teachers: [
     {teacher:{name: {ar:'محمد',en:''}, id:1},subject:{id:1,name:{ar:'عربى',en:'arabic'}, isOptional:true}},
     {teacher:{name: {ar:'محمد',en:''}, id:2},subject:{id:2,name:{ar:'عربى',en:'arabic'}, isOptional:true}},
     {teacher:{name: {ar:'محمد',en:''}, id:3},subject:{id:3,name:{ar:'عربى',en:'arabic'}, isOptional:true}},
   ]
 }


 studentsList=[
   {
     id: '#1',
     firstName: "كمال",
     lastName: 'أشرف',
   },
   {
     id: '#2',
     firstName: "أشرف",
     lastName: 'عماري',
   },

 ]

 absencStudents = [
   {
     id: '#813155',
     firstName: "كمال",
     lastName: 'أشرف',
     withCause:true
   },
   {
     id: '#813155',
     firstName: "أشرف",
     lastName: 'عماري',
     withCause:null
   },
   {
     id: '#813155',
     firstName: "كمال",
     lastName: 'حسن',
     withCause:null
   },

 ]



 // <<<<<<<<<<<<< FORMS >>>>>>>>> //

 divisionInfoForm= this.fb.group({
  id:[this.divisionId],
  name: this.fb.group({en: [''],ar: ['']}),
  trackIds:[[]],
  // forDisabilities:[],
 })


 divisionTeachersForm =this.fb.group({
  supervisior: this.fb.group({
    id: [],
    abilityToAddDegrees: [],
    name: this.fb.group({en: [''],ar: ['']})
  }),
  subjectsTeachers:this.fb.array([]) 
 })
 get subjectsTeachersCtr (){ return this.divisionTeachersForm.controls['subjectsTeachers'] as FormArray}


 addStudentForm= this.fb.group({
  studentId:[],
  trackId:[],
  optionalSubjects:[[]]
 })

 
 absenceStudentsForm={
  date:'',
  students:[]
 }

 constructor(
   private translate: TranslateService,
   private headerService:HeaderService,
   private calendarService:CalendarService,
   private fb : FormBuilder,
   private route: ActivatedRoute,
   private divisionService:DivisionService,
   private schoolsService:SchoolsService,
   private sharedService:SharedService,
   private toasterService:ToastrService
 ) { }

 ngOnInit(){
  if(this.currentUserScope==this.userScope.Employee)
	{
		this.schoolsService.currentSchoolName.subscribe((res)=>{
      if(res)  
      {
        this.currentSchool=res.split('"')[1];
      
        this.componentHeaderData.mainTitle.main=this.currentSchool;
      }
	  })
	}
  else if(this.currentUserScope==this.userScope.SPEA)
  {
    this.schoolsService.getSchool(this.schoolId).subscribe(res =>{

				if(localStorage.getItem('preferredLanguage')=='ar'){
          this.currentSchool=res.name.ar;
          this.componentHeaderData.mainTitle.main=this.currentSchool;
				  }
          else{
            this.currentSchool=res.name.en;
            this.componentHeaderData.mainTitle.main=this.currentSchool;
				  }

		})

   
  }
	  
  this.checkDashboardHeader();
   this.headerService.changeHeaderdata(this.componentHeaderData)
   this.getDivisionInfo()
 }



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Division Info >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

 getDivisionInfo(){
  this.divisionInfo=null
  this.divisionService.getDivisionInfo(this.schoolId, this.divisionId).subscribe(res=>{
    this.gradeId = res.result.grade.id
    this.divisionInfo = res.result
    this.divisionInfoForm.patchValue(res.result)
  })
 }
 
 updateDivisionInfo(){
  this.divisionService.updateDivisionInfo(this.divisionId ,this.divisionInfoForm.value)
  .subscribe(res =>{
    this.toasterService.success(this.translate.instant('toasterMessage.successUpdate'))
    this.getDivisionInfo()
  })
 }

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Division subjectsTeachers >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  getDivisionTeachers(){
    this.divisionTeachers =  null
    this.divisionService.getDivisionTeachers(this.divisionId).subscribe((res:any)=>{
      this.divisionTeachers = res.result
      this.divisionTeachersForm.patchValue(res.result)
      this.fillSubjectsTeachers(res.result.subjectsTeachers)
    })
  }

  updateDivisionTeachers(){
    this.divisionService.updateDivisionTeachers(this.divisionId,this.divisionTeachersForm.value).subscribe(res=>{
      this.getDivisionTeachers()
      this.toasterService.success(this.translate.instant('toasterMessage.successUpdate'))
    })
  }


  fillSubjectsTeachers(arr:[]){
    arr.forEach((el:any) =>{

      this.subjectsTeachersCtr.push(this.fb.group({
          teacher: this.fb.group({
            id: 0,
            name: this.fb.group({en: [el.teacher.name.en ??''],ar: [el.teacher.name.ar ??'']})
          }),
          subject:this.fb.group({
              id: 0,
              name: this.fb.group({en: [el.subject.name.en ??''],ar: [el.subject.name.ar ??'']})
          }),
      }))

    })
  }


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<< Add Student To Division >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

addStudentToDivision(data){
  this.divisionService.addStudentsTodivision(this.schoolId, this.divisionId, data).subscribe(res=>{
    this.toasterService.success(this.translate.instant('toasterMessage.addStudent'))
  })
}

 openAddStudentModel(){
  this.studentsWithoutDivision$ = this.divisionService.getStudentsWithoutDivisions(this.schoolId)
  this.setOptionalSubjects()
   this.addStudentModelOpened=true
 }
 onTrackChange(trackId){
  this.setOptionalSubjects(trackId)
 }

 setOptionalSubjects(trakId=''){
  this.optionalSubjects$=this.sharedService.getAllOptionalSubjects({schoolId: this.schoolId, gradeId:this.gradeId, trackId: trakId})
 }


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CALENDAR METHODS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
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




 
 addStudentsToAbsenceRecords(){
   
   this.absencStudents = [...this.absencStudents,...this.selectedStudents]
   
   this.addStudentsModelOpened = false
 }

 deleteRecord(index) {
   this.absencStudents.splice(index, 1)
 }





 checkDashboardHeader()
  {
      if(this.currentUserScope==UserScope.Employee)
    {
      this.componentHeaderData.breadCrump=
      [
     
        { label: this.translate.instant('dashboard.schools.schoolTracks'), routerLink: `/dashboard/grades-and-divisions/school/${this.schoolId}/divisions`,routerLinkActiveOptions:{exact: true},visible:false},
        { label: this.translate.instant('breadcrumb.editTrack'), routerLink: `/dashboard/grades-and-divisions/school/${this.schoolId}/divisions/division/${this.divisionId}`},
      ]

      
    }
    else if (this.currentUserScope==UserScope.SPEA)
    {
      this.componentHeaderData.breadCrump=
         [
          {label:this.translate.instant('breadcrumb.schoolList'),routerLink: `/dashboard/schools-and-students/schools/school/${this.schoolId}`,routerLinkActiveOptions:{exact: true}},
          {label:this.translate.instant('breadcrumb.showSchoolListDetails'),routerLink: `/dashboard/schools-and-students/schools/school/${this.schoolId}`,routerLinkActiveOptions:{exact: true}},
          {label:this.translate.instant('breadcrumb.editTrack'),routerLink: `/dashboard/schools-and-students/schools/school/${this.schoolId}/division/${this.divisionId}`},
        ]

      
    }
  }

}
