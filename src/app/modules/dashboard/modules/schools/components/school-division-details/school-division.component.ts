import { Component, OnInit ,inject} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft, faPlus, faClose } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { CalendarEvent } from 'angular-calendar';
import { addDays, addHours, startOfDay, subDays } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { map, share, shareReplay } from 'rxjs';
import { getLocalizedValue } from 'src/app/core/classes/helpers';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { GradeCalenderEvent } from 'src/app/core/models/schools/school.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { CalendarService } from 'src/app/shared/services/calendar/calendar.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { DivisionService } from '../../services/division/division.service';
import { GradesService } from '../../services/grade/grade.service';
import { SchoolsService } from '../../services/schools/schools.service';

@Component({
  selector: 'app-school-division',
  templateUrl: './school-division.component.html',
  styleUrls: ['./school-division.component.scss']
})
export class SchoolDivisionComponent implements OnInit {

 currentUserScope = inject(UserService).getCurrentUserScope()
 faPlus=faPlus
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

 step =1
 isSubmited

 // << DATA SOURCE >> //
 divisionInfo
 divisionTeachers
 tracks$=this.divisionService.getDivisionTracks(this.divisionId)
 schoolTeachers$
 studentsWithoutDivision$
 optionalSubjects$

 divisionSubjects$ = this.divisionService.getDivisionSubjects(this.schoolId,this.divisionId,{KeyWord: this.searchText})
 .pipe(
  map(res => res.result.data),
  map(res => res.map(el => ({id: el.subjectId, name:el.subjectName})))
  )
 gradeSubjects$
 eventSubjects=[]
 selectedEventId


 events: GradeCalenderEvent[]

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
 get isAllowToAddDegrees(){ return this.divisionTeachersForm.get('supervisior.abilityToAddDegrees') as FormControl}

 addStudentForm:FormGroup
 

 constructor(
   private translate: TranslateService,
   private headerService:HeaderService,
   private fb : FormBuilder,
   private route: ActivatedRoute,
   private divisionService:DivisionService,
   private schoolsService:SchoolsService,
   private sharedService:SharedService,
   private toasterService:ToastrService,
   private userService:UserService,
   private gradeService:GradesService
 ) {  }

 ngOnInit(){
  if(this.currentUserScope==this.userScope.Employee){
		this.userService.currentUserSchoolName$?.subscribe((res)=>{
      if(res) {
        this.currentSchool=res;
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
	  
  this.getDivisionInfo()
}


getGradeSubjects(){
  this.gradeSubjects$ = this.gradeService.getGradeSubjects(this.schoolId,this.gradeId).pipe(shareReplay())
  // this.gradeSubjects$ = this.divisionService.getDivisionSubjects(this.schoolId,this.divisionId)
  // .pipe(
  //   map(res => res.result.data),
  //   map(res => res.map(el => ({id: el.subjectId, name:el.subjectName}) )),
  //   shareReplay()
  //   )
 }


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Division Info >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

getDivisionInfo(){
  this.divisionInfo=null
  this.divisionService.getDivisionInfo(this.schoolId, this.divisionId).subscribe(res=>{
    this.gradeId = res.result?.grade?.id
    this.divisionInfo = res.result
    this.divisionInfoForm.patchValue(res.result)
    this.componentHeaderData.mainTitle.sub= `(${getLocalizedValue( res.result.grade.name.ar)})`
    this.componentHeaderData.subTitle.sub = `(${getLocalizedValue( res.result.name)})`
    this.headerService.changeHeaderdata(this.componentHeaderData)
  })
 }
 
 updateDivisionInfo(){
  this.isSubmited=true
  this.divisionService.updateDivisionInfo(this.divisionId ,this.divisionInfoForm.value)
  .subscribe(res =>{
    this.isSubmited=false
    this.toasterService.success(this.translate.instant('toasterMessage.successUpdate'))
    this.getDivisionInfo()
  },err=>{
    this.isSubmited=false
    this.toasterService.error(this.translate.instant('toasterMessage.error'))
  })
 }

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Division subjectsTeachers >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  getDivisionTeachers(){
    this.schoolTeachers$ = this.divisionService.getSchoolTeachers(this.schoolId).pipe(share())
    this.divisionTeachers =  null
    this.divisionService.getDivisionTeachers(this.divisionId).subscribe((res:any)=>{
      this.divisionTeachers = res.result
      this.divisionTeachersForm.patchValue(res.result)
      this.fillSubjectsTeachers(res.result.subjectsTeachers)
      this.abilityToAddDegreesChanged()
    })
  }

  updateDivisionTeachers(){
    this.isSubmited=true
    this.divisionService.updateDivisionTeachers(this.divisionId,this.divisionTeachersForm.value).subscribe(res=>{
      this.getDivisionTeachers()
      this.toasterService.success(this.translate.instant('toasterMessage.successUpdate'))
      this.isSubmited=false
    },err=>{
      this.isSubmited=false
    })
  }


  fillSubjectsTeachers(arr:[]){
    this.subjectsTeachersCtr.clear()
    let isSubjectTeacherRequired= !this.divisionTeachers.supervisior?.abilityToAddDegrees
    arr.forEach((el:any) =>{

      this.subjectsTeachersCtr.push(this.fb.group({
          teacher: this.fb.group({
            id: [el.teacher?.id || null, isSubjectTeacherRequired ? Validators.required:''],
            name: this.fb.group({en: [el.teacher?.name?.en ??''],ar: [el.teacher?.name?.ar ??'']})
          }),
          subject:this.fb.group({
              id: el.subject?.id || null,
              name: this.fb.group({en: [el.subject?.name?.en ??''],ar: [el.subject?.name?.ar ??'']})
          }),
      }))

    })
  }

  // update required validation at run time
  abilityToAddDegreesChanged(){

    this.divisionTeachersForm.get('supervisior.abilityToAddDegrees')
    .valueChanges
    .subscribe(val=>{
      if(!val) {
        
        this.subjectsTeachersCtr.controls.forEach(el =>{

          el.get('teacher.id').setValidators(Validators.required)
          el.get('teacher.id').updateValueAndValidity()
        })
      }
      else {
        this.subjectsTeachersCtr.controls.forEach(el =>{
          el.get('teacher.id').removeValidators(Validators.required)
          el.get('teacher.id').updateValueAndValidity()          
        })
      }

    })
  }


  getSchoolTeachers(){
    this.divisionService.getSchoolTeachers(this.schoolId)
  }
  

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<< Add Student To Division >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
addStudentToDivision(data){
  this.isSubmited = true
  this.divisionService
  .addStudentsTodivision(this.schoolId,this.gradeId, this.divisionId, data)
  .pipe( map(res => {
    if(!res.error) return res
    else throw new Error(res.error)
  }))
  .subscribe(res=>{
    this.isSubmited = false
    this.addStudentModelOpened = false
    this.toasterService.success(this.translate.instant('toasterMessage.addStudent'))
    this.addStudentForm.reset()
  },err =>{
    this.isSubmited = false
    this.toasterService.error('لا يمكن تجاوز العدد الاعظمي للطلاب في الشعبة.')
  })
}

 openAddStudentModel(){
  this.addStudentForm = this.fb.group({
    studentId:['',  Validators.required],
    trackId:['', this.divisionInfo?.hasTracks ? Validators.required : null],
    optionalSubjects:[[]]
   })

  this.studentsWithoutDivision$=this.divisionService.getStudentsWithoutDivision(this.schoolId).pipe(map(res=> res.result))
  this.setOptionalSubjects()
   this.addStudentModelOpened=true
 }

 onTrackChange(trackId){
  this.setOptionalSubjects(trackId)
 }

 setOptionalSubjects(trakId=''){
  this.optionalSubjects$=this.sharedService.getAllOptionalSubjects({schoolId: this.schoolId, gradeId:this.gradeId, trackId: trakId}).pipe(share())
 }


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CALENDAR METHODS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
getGradeClassEvents(){
  this.events=null
  this.gradeService.getDivisionLecetureEvents(this.schoolId,this.gradeId,this.divisionId)
  .pipe(
    map(res=> res.map(event => ({...event, start: event.start.split('+')[0], end: event.end.split('+')[0]}))),
    map(res=>{
    return res.map(el => ({...el, start: new Date(el.start), end: new Date(el.end)}))
  }))
  .subscribe((res:GradeCalenderEvent[])=>{
    this.events = [...res]
  })
}

 eventClicked(event){
  this.eventSubjects=event.meta.subjects
   this.selectedEventId= event.lectureId 
   this.openSubjectsModel=true
 }

 addSubjectsToCalendarEvent(event:Event, lectureId){
  this.isSubmited = true
   event.preventDefault()
  //  let selectedEvent = this.events.find((e)=> e.id == id)
  //  selectedEvent.meta.subjects = [...selectedEvent.meta.subjects,...this.eventSubjects]
  //  this.events = [...this.events]
   
   this.gradeService.addSubjectToClassEvent(lectureId, this.divisionId,this.eventSubjects).subscribe(res=>{
    this.getGradeClassEvents()
    this.isSubmited = false
     this.openSubjectsModel = false
     this.eventSubjects=[]
     this.toasterService.success(this.translate.instant('toasterMessage.addSubject'))

   },err=>{
    this.isSubmited = false
    this.toasterService.error(this.translate.instant('toasterMessage.error'))
   })


 }


 onSearch(){
  this.divisionSubjects$ = this.divisionService.getDivisionSubjects(this.schoolId,this.divisionId,{KeyWord: this.searchText}).pipe(map(res => res.result.data))
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

    this.headerService.changeHeaderdata(this.componentHeaderData)
  }

}
