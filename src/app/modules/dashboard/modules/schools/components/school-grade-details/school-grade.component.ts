import { Component, OnInit ,inject, OnDestroy} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { Subject, switchMap, takeUntil } from 'rxjs';
import { SchoolsService } from '../../services/schools/schools.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getLocalizedValue } from 'src/app/core/classes/helpers';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/core/services/translation/translation.service';


@Component({
  selector: 'app-school-class',
  templateUrl: './school-grade.component.html',
  styleUrls: ['./school-grade.component.scss']
})
export class SchoolGradeComponent implements OnInit, OnDestroy {
  faPlus=faPlus

  currentUserScope = inject(UserService).getCurrentUserScope()
  lang = inject(TranslationService).lang
  onDestroy$ = new Subject()

  get claimsEnum () {return ClaimsEnum}

  get userScope() { return UserScope };
	schoolId = this.route.snapshot.paramMap.get('schoolId')
  currentSchool="";
  gradeId = this.route.snapshot.paramMap.get('gradeId')


  // << DASHBOARD HEADER DATA >>
  componentHeaderData: IHeader={
    breadCrump: [],
    mainTitle:{ main: this.currentSchool },
    subTitle: {main: this.translate.instant('dashboard.schools.editClass') , sub:'(الصف الرابع)'}
  }



  // << DATA >>
  tracks:GradeTrack[]=inject(GradesService).tracks ;
  subjects=inject(GradesService).subjects ;
  subjectsToDelete=[] //we will collect all subjects we are deleted and call delete API before calling PUT Api [Save Changes button]



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
    schoolGradeId:[],
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
  getCtr(control){ return this.gradeForm.controls[control] as FormControl}

  get gradeTracks(){ return this.gradeForm.controls['tracks'] as FormArray }
  getGradeTrack = (index) => (this.gradeTracks.controls[index] as FormGroup)
  getTrackSubjects = (index) => (this.getGradeTrack(index).controls['subjects'] as FormArray)
  get gradeSubjects(){ return this.gradeForm.controls['subjects'] as FormArray }

  constructor(
    private translate: TranslateService,
    private headerService:HeaderService,
    private fb: FormBuilder,
    private schoolsService:SchoolsService,
    private route: ActivatedRoute,
    private gradeService :GradesService,
    private confirmModelService: ConfirmModelService,
    private userService:UserService,
    private toaster:ToastrService
    ) { }


  ngOnInit(): void {


    this.setHeaderData();

    this.getGradeDetails()
    this.getSubjectsList(this.schoolId)
    this.initListener()
  }

  initListener(){
    this.confirmModelListener()
    this.onConfirmModelClosed()
  }


  getSubjectsList(schoolId){
    this.gradeService.getGradeSubjects(schoolId, this.gradeId).subscribe(res=>{
      this.subjectsList = res
    })


  }

  getGradeDetails(){
    this.gradeData=null
    this.gradeService.getGrade(this.schoolId, this.gradeId).subscribe((res :SchoolGrade)=>{
      this.hasTracks = res.hasTracks
      // this.gradeForm.patchValue(res as any)
      this.componentHeaderData.subTitle.sub = ` (${getLocalizedValue(res.name)})`
      this.headerService.changeHeaderdata(this.componentHeaderData)

      this.initForm(res)
      this.gradeData = res
    })
  }

  updateGrade(){
    this.isSubmited=true
    if(this.subjectsToDelete.length){
      this.gradeService.deleteGradeSubjets(this.subjectsToDelete)
      .pipe(
        switchMap(res=>{
          this.isSubmited=true
          return this.gradeService.updateGrade(this.schoolId ,this.gradeForm.value)
        })
      ).subscribe(res=>{
        this.isSubmited=false
        this.subjectsToDelete=[]
        this.getGradeDetails()
        this.toaster.success(this.translate.instant('toasterMessage.successUpdate'))
      },(err)=>{
        this.isSubmited=false
        this.toaster.error(this.translate.instant('toasterMessage.error'))
      })
    }else{

      this.gradeService.updateGrade(this.schoolId ,this.gradeForm.value).subscribe(res=>{
        this.isSubmited=false
        this.subjectsToDelete=[]
        this.getGradeDetails()
        this.toaster.success(this.translate.instant('toasterMessage.successUpdate'))
      },(err)=>{
        this.isSubmited=false
        this.toaster.error(this.translate.instant('toasterMessage.error'))      })
    }
  }





  onTracksModeChange(isChecked:boolean){
    // if(this.gradeForm.pristine) return
    this.willHasTrack = isChecked

    if(!isChecked){ //لايوجد مسارات
      if(this.gradeData.tracks?.length){
        this.confirmModelService.openModel({message: this.translate.instant('dashboard.schools.trackWillBeDeleted')})

      } else{
        this.hasTracks = this.willHasTrack
        this.gradeForm.controls.hasTracks.setValue(this.willHasTrack)
      }
    }
    else if(isChecked) { // يوجد مسارات
      if(this.gradeData.subjects?.length){
        this.confirmModelService.openModel({message:this.translate.instant('dashboard.schools.subjectsWillBeDeleted')})

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
      this.gradeForm.controls.hasTracks.setValue(this.willHasTrack)

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
      id:[null, Validators.required],
      // name:this.fb.group({
      //   ar:[''],
      //   en:['']
      // }),
      // classRoomNumber:[],
      studyHour: [1],
      isOptional:[false],
      weekClassRoomNumber:[1],
      haveGpa:[true],
      isAddToFinalScore:[true],
      maxGpa:[0],
      gradeSubjectId:[0],
      trackSubjectId:[0]
    })
  }


  fillTracks(tracks){
    this.gradeTracks.clear()
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
        // name:this.fb.group({
        //   ar:[subject.name.ar??''],
        //   en:[subject.name.en??'']
        // }),
        // classRoomNumber:[subject.classRoomNumber??0],
        // studyHour: [subject.studyHour.ticks??0],
        studyHour: [subject.studyHour? subject.studyHour: 1],
        haveGpa:[subject.haveGpa?? false],
        weekClassRoomNumber:[subject.weekClassRoomNumber ? subject.weekClassRoomNumber : 1],
        isOptional:[subject.isOptional],
        isAddToFinalScore:[subject.isAddToFinalScore],
        maxGpa:[subject.maxGpa??0],
        gradeSubjectId:[subject.gradeSubjectId??0],
        trackSubjectId:[subject.trackSubjectId??0]
      }))
    })

    return trackSubjectsArr
  }

  addSubjectToTrack(trackIndex){
    this.getTrackSubjects(trackIndex).push(this.newSubjectGroup())
  }

  deleteTrackSubjects(subjectId ,trackIndex, subjectIndex){
    this.subjectsToDelete.push(subjectId)
    this.getTrackSubjects(trackIndex).removeAt(subjectIndex)
    this.toaster.success(this.translate.instant('mission Succeeded'))
  }

  newTrackGroup(){
    return this.fb.group({
      TrackId :[0],
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
    this.subjectsToDelete = this.getTrackSubjects(trackIndex).value.map(el=>el.gradeSubjectId)
    this.gradeTracks.removeAt(trackIndex)
    this.toaster.success(this.translate.instant('mission Succeeded'))
  }

  resetTracks(){
    this.subjectsToDelete = this.gradeTracks.value.map(track=> track.subjects).map(subjectArr =>subjectArr[0].gradeSubjectId)

    this.gradeTracks.clear()
  }

// <<<<<<<<<<<<<<<<<<<< Incase there is no Tracks >>>>>>>>>>>>>>>>>>>>>>>>>>>>
  fillSubjects(subjects){
    this.gradeSubjects.clear()
    subjects.forEach(subject =>{
      this.gradeSubjects.push(this.fb.group({
        id:[subject.id],
        // name:this.fb.group({
        //   ar:[subject.name.ar?? ''],
        //   en:[subject.name.en ?? '']
        // }),
        // classRoomNumber:[subject.classRoomNumber??0],
        // studyHour: [subject.studyHour.ticks??0],
        studyHour: [subject.studyHour? subject.studyHour :1],
        haveGpa:[subject.haveGpa?? false],
        isOptional:[subject.isOptional],
        weekClassRoomNumber:[subject.weekClassRoomNumber? subject.weekClassRoomNumber :1],
        isAddToFinalScore:[subject.isAddToFinalScore],
        maxGpa:[subject.maxGpa??0],
        gradeSubjectId:[subject.gradeSubjectId??0],
        trackSubjectId:[subject.trackSubjectId??0]
        })
      )

    })
  }


  addSubject(){
    this.gradeSubjects.push(this.newSubjectGroup())
  }

  deleteSubject(subjectId, subjectIndex){
    this.subjectsToDelete.push(subjectId)
    this.gradeSubjects.removeAt(subjectIndex)
  }

  resetSubjects(){
    this.subjectsToDelete = this.gradeSubjects.value.map(el=> el.gradeSubjectId)
    this.gradeSubjects.clear()
  }



  setHeaderData(){

    if(this.currentUserScope==UserScope.Employee){
      this.componentHeaderData.breadCrump=[
        { label: this.translate.instant('dashboard.schools.schoolClasses'), routerLink: `/dashboard/grades-and-divisions/school/${this.schoolId}/grades`,routerLinkActiveOptions:{exact: true},visible:false},
        { label: this.translate.instant('breadcrumb.editClass'), routerLink: `/dashboard/grades-and-divisions/school/${this.schoolId}/grades/grade/${this.gradeId}`},
      ]


      this.userService.currentUserSchoolName$?.subscribe((res)=>{
        if(res)  {
          this.currentSchool=res;
          this.componentHeaderData.mainTitle.main=this.currentSchool;
        }
      })

    }
    else if (this.currentUserScope==UserScope.SPEA)
    {
      this.componentHeaderData.breadCrump=[
          {label:this.translate.instant('breadcrumb.schoolList'),routerLink: '/dashboard/schools-and-students/schools',routerLinkActiveOptions:{exact: true}},
          {label:this.translate.instant('breadcrumb.showSchoolListDetails'),routerLink: `/dashboard/schools-and-students/schools/school/${this.schoolId}`,routerLinkActiveOptions:{exact: true}},
          {label:this.translate.instant('breadcrumb.editClass'),routerLink: `/dashboard/schools-and-students/schools/school/${this.schoolId}/grade/${this.gradeId}`},
        ]


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

  }


  ngOnDestroy(): void {
    this.onDestroy$.next(null)
    this.onDestroy$.complete()
    this.confirmModelService.confirmed$.next(null)
  }
}
