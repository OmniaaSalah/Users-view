import { Component, OnInit ,inject, OnDestroy} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { CalendarService } from 'src/app/shared/services/calendar/calendar.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { GradesService } from '../../services/grade/grade.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { GradeTrack, SchoolGrade, SchoolSubject } from 'src/app/core/models/schools/school.model';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { Subject, takeUntil } from 'rxjs';
import { SchoolsService } from '../../services/schools/schools.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-school-class',
  templateUrl: './school-grade.component.html',
  styleUrls: ['./school-grade.component.scss']
})
export class SchoolGradeComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject()

  faPlus=faPlus

  get claimsEnum () {return ClaimsEnum}
	schoolId = this.route.snapshot.paramMap.get('schoolId')
  currentSchool="";
  gradeId = this.route.snapshot.paramMap.get('gradeId')
  currentUserScope = inject(UserService).getCurrentUserScope()
  get userScope() { return UserScope };
  // << DASHBOARD HEADER DATA >>
  componentHeaderData: IHeader={
    breadCrump: [],
    mainTitle:{ main: this.currentSchool },
    subTitle: {main: this.translate.instant('dashboard.schools.editClass') , sub:'(الصف الرابع)'}
  }



  // << DATA >>
  tracks:GradeTrack[]=inject(GradesService).tracks ;
  subjects=inject(GradesService).subjects ;



  // << CONDITIONS >>
  step=1
  hasTracks:boolean
  willHasTrack:boolean

  isSubmited:boolean
    
  gradeData:SchoolGrade
  subjectsList=[]

  // << FORMS >>
  gradeForm= this.fb.group({
    id: [this.gradeId],
    name: this.fb.group({
      ar:[''],
      en:['']
    }),
    hasTracks:[],
    hasDescription:[],
    addDegreesAndDescriptionPosiblity:[],
    // classSchedule:[],
    tracks: this.fb.array([]),
    subjects:this.fb.array([])
  })

  // << FORM CONTROLS >> //
  get gradeTracks(){ return this.gradeForm.controls['tracks'] as FormArray }
  getGradeTrack = (index) => (this.gradeTracks.controls[index] as FormGroup)
  getTrackSubjects = (index) => (this.getGradeTrack(index).controls['subjects'] as FormArray)
  get gradeSubjects(){ return this.gradeForm.controls['subjects'] as FormArray }

  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private calendarService:CalendarService,
    private fb: FormBuilder,
    private schoolsService:SchoolsService,
    private route: ActivatedRoute,
    private gradeService :GradesService,
    private confirmModelService: ConfirmModelService,
    private userService:UserService,
    ) { }


  ngOnInit(): void {
    if(this.currentUserScope==this.userScope.Employee)
    {
    
      this.userService.currentUserSchoolName$?.subscribe((res)=>{
      
      if(res)  
      {
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
    this.headerService.changeHeaderdata(this.componentHeaderData)

    this.getGradeDetails()
    this.getSubjectsList(this.schoolId)

    this.confirmModelListener()
    this.onConfirmModelClosed()
    // setTimeout(() => {
    //   this.hasTracks=false
    // }, 2000);
  }

  getSubjectsList(schoolId){
    this.gradeService.getSchoolSubjects(schoolId).subscribe(res=>{
      this.subjectsList = res
    })
  }
  
  getGradeDetails(){
    this.gradeService.getGrade(this.schoolId, this.gradeId).subscribe((res :SchoolGrade)=>{
      this.hasTracks = res.hasTracks
      // this.gradeForm.patchValue(res as any)
      this.initForm(res)
      this.gradeData = res
    })
  }

  updateGrade(){
    this.isSubmited=true
    this.gradeService.updateGrade(this.gradeForm.value).subscribe(res=>{
      this.isSubmited=false
    },(err)=>{
      this.isSubmited=false
    })
  }


  


  onTracksModeChange(haveTracksCheckbox:boolean){
    console.log(haveTracksCheckbox);
    // if(this.gradeForm.pristine) return
    this.willHasTrack = haveTracksCheckbox
    
    if(!haveTracksCheckbox){
      if(this.gradeData.tracks?.length){
        this.confirmModelService.openModel({message:'يرجعى العلم انه سيتم حذف جميع المسارات والمواد المعرفه سابقا'})
      } else{
        this.hasTracks = this.willHasTrack
        this.gradeForm.controls.hasTracks.setValue(this.willHasTrack)
      }
    }
    else if(haveTracksCheckbox) {
      if(this.gradeData.subjects?.length){
        this.confirmModelService.openModel({message:'يرجع العلم انه سيتم حذف جميع المواد المعرفه سابقا!'})
        // this.hasTracks= false
      }else{
        this.hasTracks = this.willHasTrack
        this.gradeForm.controls.hasTracks.setValue(this.willHasTrack)
      }

    }
  }

  confirmModelListener(){
    this.confirmModelService.confirmed$
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(val=>{
      this.hasTracks= this.willHasTrack
      if(this.hasTracks) this.resetSubjects() 
      else this.resetTracks()
    })
  }

  onConfirmModelClosed(){
    this.confirmModelService.onClose$
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(val=>{
      this.hasTracks= !this.willHasTrack
    })
  }


  // << FORM METHODS >> //

  // <<<<<<<<<<<<<<<<<<<<< Incase there is Tracks >>>>>>>>>>>>>>>>>>>>>>>>>

  initForm(formData:SchoolGrade){   
    this.gradeForm.patchValue(formData as any) 
    if(this.hasTracks) this.fillTracks(formData.tracks)
    else this.fillSubjects(formData.subjects)
  }

  newSubjectGroup(){
    return this.fb.group({
      id:[null],
      name:this.fb.group({
        ar:[''],
        en:['']
      }),
      // classRoomNumber:[],
      studyHour: [1],
      isOptional:[false],
      weekClassRoomNumber:[1],
      haveGpa:[true],
      isAddToFinalScore:[true],
      maxGpa:[0]
    })
  }

  
  fillTracks(tracks){    
    tracks.forEach((el, index) => {
      this.gradeTracks.push(this.fb.group({
        id:[el.id??''],
        name:this.fb.group({
          ar:[el.name.ar?? ''],
          en:[el.name.en ?? '']
        }),
        subjects: this.fillTrackSubjects(index, el.subjects)
      }))
    })
    
  }


  fillTrackSubjects(trackIndex, subjects: SchoolSubject[]){
    let trackSubjectsArr = this.fb.array([]) as FormArray

    subjects.forEach(subject =>{
      trackSubjectsArr.push(this.fb.group({
        id:[subject.id],
        name:this.fb.group({
          ar:[subject.name.ar??''],
          en:[subject.name.en??'']
        }),
        // classRoomNumber:[subject.classRoomNumber??0],
        // studyHour: [subject.studyHour.ticks??0],
        studyHour: [subject.studyHour.ticks??0],
        haveGpa:[subject.haveGpa?? false],
        weekClassRoomNumber:[subject.weekClassRoomNumber??0],
        isOptional:[subject.isOptional],
        isAddToFinalScore:[subject.isAddToFinalScore],
        maxGpa:[subject.maxGpa??0]
      }))
    })

    return trackSubjectsArr
  }

  addSubjectToTrack(trackIndex){
    this.getTrackSubjects(trackIndex).push(this.newSubjectGroup())
  }

  
  deleteTrackSubjects(trackIndex, subjectIndex){
    this.getTrackSubjects(trackIndex).removeAt(subjectIndex)
  }

  newTrackGroup(){
    return this.fb.group({
      name:this.fb.group({
        ar:[''],
        en:['']
      }),
      subjects: this.fb.array([])
    })
  }

  addTrack(){
    this.gradeTracks.push(this.newTrackGroup())
  }


  deleteTrack(trackIndex){
    this.gradeTracks.removeAt(trackIndex)
  }

  resetTracks(){
    this.gradeTracks.clear()
  }

// <<<<<<<<<<<<<<<<<<<< Incase there is no Tracks >>>>>>>>>>>>>>>>>>>>>>>>>>>>
  fillSubjects(subjects){
    subjects.forEach(subject =>{
      this.gradeSubjects.push(this.fb.group({
        id:[subject.id],
        name:this.fb.group({
          ar:[subject.name.ar?? ''],
          en:[subject.name.en ?? '']
        }),
        // classRoomNumber:[subject.classRoomNumber??0],
        // studyHour: [subject.studyHour.ticks??0],
        studyHour: [subject.studyHour.ticks??0],
        haveGpa:[subject.haveGpa?? false],
        isOptional:[subject.isOptional],
        weekClassRoomNumber:[subject.weekClassRoomNumber??0],
        isAddToFinalScore:[subject.isAddToFinalScore],
        maxGpa:[subject.maxGpa??0]
        })
      )

    })
  }


  addSubject(){
    this.gradeSubjects.push(this.newSubjectGroup())
  }

  deleteSubject(subjectIndex){
    this.gradeSubjects.removeAt(subjectIndex)
  }

  resetSubjects(){
    this.gradeSubjects.clear()
  }



  checkDashboardHeader()
  {
      if(this.currentUserScope==UserScope.Employee)
    {
      this.componentHeaderData.breadCrump=
      [
        
        { label: this.translate.instant('dashboard.schools.schoolClasses'), routerLink: `/dashboard/grades-and-divisions/school/${this.schoolId}/grades`,routerLinkActiveOptions:{exact: true},visible:false},
        { label: this.translate.instant('breadcrumb.editClass'), routerLink: `/dashboard/grades-and-divisions/school/${this.schoolId}/grades/grade/${this.gradeId}`},
      ]

      
    }
    else if (this.currentUserScope==UserScope.SPEA)
    {
      this.componentHeaderData.breadCrump=
         [
          {label:this.translate.instant('breadcrumb.schoolList'),routerLink: '/dashboard/schools-and-students/schools',routerLinkActiveOptions:{exact: true}},
          {label:this.translate.instant('breadcrumb.showSchoolListDetails'),routerLink: `/dashboard/schools-and-students/schools/school/${this.schoolId}`,routerLinkActiveOptions:{exact: true}},
          {label:this.translate.instant('breadcrumb.editClass'),routerLink: `/dashboard/schools-and-students/schools/school/${this.schoolId}/grade/${this.gradeId}`},
        ]

      
    }
  }


  ngOnDestroy(): void {
    this.onDestroy$.next(null)
    this.onDestroy$.complete()
    this.confirmModelService.confirmed$.next(null)
  }
}
