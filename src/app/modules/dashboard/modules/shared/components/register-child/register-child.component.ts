import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, filter, finalize, first, last, map, Observable, share, Subject, takeUntil, throwError } from 'rxjs';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { Division, OptionalSubjects, Track } from 'src/app/core/models/global/global.model';
import { RequestRule } from 'src/app/core/models/settings/settings.model';
import { Student } from 'src/app/core/models/student/student.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { RegistrationStatus, StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { requestTypeEnum } from 'src/app/shared/enums/system-requests/requests.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IndexesService } from '../../../indexes/service/indexes.service';
import { ParentService } from '../../../parants/services/parent.service';
import { DivisionService } from '../../../schools/services/division/division.service';
import { GradesService } from '../../../schools/services/grade/grade.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { StudentsService } from '../../../students/services/students/students.service';
import { SettingsService } from '../../../system-setting/services/settings/settings.service';
import { RegisterChildService } from '../../services/register-child/register-child.service';

@Component({
  selector: 'app-register-child',
  templateUrl: './register-child.component.html',
  styleUrls: ['./register-child.component.scss']
})
export class RegisterChildComponent implements OnInit, AfterViewInit,OnDestroy {
  display:boolean = false;
  ngDestroy$ = new Subject()
  scope = this.userService.getCurrentUserScope()
  get scopeEnum() { return UserScope }
  
  lang =inject(TranslationService).lang;
  @Input('mode') mode : 'edit'| 'view'= 'view'
  @ViewChild('nav') nav: ElementRef
  get userScope() { return UserScope }
  currentUserScope = inject(UserService).getCurrentUserScope();
  get claimsEnum(){ return ClaimsEnum }
  get registrationStatusEnum() {return RegistrationStatus}
  get fileTypesEnum () {return FileEnum}
  
  studentId = +this.route.snapshot.paramMap.get('id')
  childId = +this.route.snapshot.paramMap.get('childId')
  schoolId ;
  gradeId;


  items: MenuItem[]=[
    {label: this.translate.instant('dashboard.students.transferStudentToAnotherSchool'), icon:'assets/images/shared/student.svg',routerLink:`transfer`,claims:ClaimsEnum.S_TransferStudentToAnotherSchool},
    {label: this.translate.instant('dashboard.students.sendStudentDeleteRequest'), icon:'assets/images/shared/delete.svg',routerLink:`../../delete-student/${this.studentId}`,claims:ClaimsEnum.E_DeleteStudentRequest},
    {label: this.translate.instant('dashboard.students.IssuanceOfACertificate'), icon:'assets/images/shared/certificate.svg',routerLink:'IssuanceOfACertificateComponent',claims:ClaimsEnum.S_StudentCertificateIssue},
    {label: this.translate.instant('dashboard.students.sendRepeateStudyPhaseReqest'), icon:'assets/images/shared/file.svg',claims:ClaimsEnum.G_RepeatStudyPhaseRequest},
    {label: this.translate.instant('dashboard.students.sendRequestToEditPersonalInfo'), icon:'assets/images/shared/user-badge.svg',claims:ClaimsEnum.GE_ChangePersonalIdentityReqest},
    {label: this.translate.instant('dashboard.students.sendWithdrawalReq'), icon:'assets/images/shared/list.svg',claims:ClaimsEnum.G_WithdrawingStudentFromCurrentSchool},
    {label: this.translate.instant('dashboard.students.exemptionFromSubjectStudey'), icon:'assets/images/shared/file.svg', claims:ClaimsEnum.G_ExemptionFromStudySubjectReqest},
    // {label: this.translate.instant('dashboard.students.editStudentInfo'), icon:'assets/images/shared/list.svg',routerLink:'delete-student/5'},
    // {label: this.translate.instant('dashboard.students.transferStudentFromDivisionToDivision'), icon:'assets/images/shared/recycle.svg',routerLink:'delete-student/5'},
  ];

  step
  navListLength=1
	hideNavControl:boolean= true;


  // << DATA PLACEHOLDER >> //

  // for Sharing between multiple components instead of make multiple Http Requests
  student$: Observable<Student> = this.childService.Student$
  currentStudent:Student



  optionalSubjectsList:OptionalSubjects[]
    // schoolDivisions$ = this.schoolsService.getSchoolDivisions(2).pipe(map(val =>val.data), share())
    currentStudentDivision:Division
    gradeDivisions$ :Observable<Division>
    divisionTracks$ :Observable<Track>

    targetDivision:Division
    isTrackSelected =false

    booleanOptions = this.sharedService.booleanOptions
    genderOptions = this.sharedService.genderOptions
    countries$ = this.countriesService.getCountries()
    religions$= this.sharedService.getReligion()
    reasonForRepeateStudyPhase$ = this.indexesService.getIndext(IndexesEnum.TheReasonForRegradingRequest)
    subjectsExemption$//المواد القابله للاعفاء


    RepeateStudyPhaseModelOpend =false
    transferStudentModelOpened=false
    showWithdrawalReqScreen=false
    changeIdentityNumModelOpened=false
    changeStudentIdentityInfoModelOpened=false
    exemptionFromStudyModelOpend =false

    isLoading

    // << FORMS >> //
    onSubmit =false

    get localizeFormGroup(){
      return this.fb.group({ id:[], name:this.fb.group({ar:['a'], en: ['a']})})
    }


    studentForm= this.fb.group({
      name: this.fb.group({
        ar:['', Validators.required],
        en:['', Validators.required]
      }),
      surname: this.fb.group({
        ar:['', Validators.required],
        en:['', Validators.required]
      }),
      birthDate:['', Validators.required],
      gender:['', Validators.required],
      nationalityId:[0 , Validators.required],
      religionId:[1, Validators.required],
      isTalented: ['', Validators.required],
      
      reasonForNotHavingEmiratesId:[null],
      passportId:[],
      passportIdExpirationDate:[],

      daleelId: ['', Validators.required],//remove
      studentNumber:['', Validators.required],
      ministerialId:['', Validators.required],
      manhalNumber:['', Validators.required],
      isSpecialAbilities:[],//
      isChildOfAMartyr:['',Validators.required],
      isHasInternet:["", Validators.required],
      isHasPhone:["", Validators.required],
      isUsePublicTransportation:["", Validators.required],
      isSpecialEducation:['', Validators.required],//
      studentBehavior: this.fb.group({ //
        id: 0,
        descrition: []
      }),
      nationalityCategory: this.localizeFormGroup,
      specialEducation: this.localizeFormGroup,
      motherLanguage: this.localizeFormGroup,
      languageAtHome: this.localizeFormGroup,
      mostUsedLanguage: this.localizeFormGroup,

      studentPayments: this.fb.group({
        fullAmountToBePaid: [],
        paidAmount: [],
        remainingAmount: [],
        accountantComment:  ['تعليق المحاسب '],
      }),
      prohibited: this.fb.group({
        id: [],
        rCertificateFromSPEA : [null],
        certificateFromSchool : [null],
        withdrawingFromSPEA : [null],
        withdrawingFromSchool : [null],
      }),
      address: this.fb.group({
        id: [''],
        city: [''],
        emirate: [''],
        state: ['']
      }),
      studentTalent:[[]]
    })
    

 


    // Transfer From Division To Division
    transferStudentForm={
      studentId: this.studentId || this.childId,
      currentDivisionId: null,
      updatedDivisionId: null,
      trackId: '',
      electiveSubjectId: []
    }
    

    requiredFiles:RequestRule
    
    changeIdentityNumForm={
      identityNumber: null,
      identityAttachmentPath:"",
      studentId: this.studentId || this.childId,
      childId : null
    }

    changeStudentInfoReqForm= this.fb.group({
      studentId: [this.studentId || this.childId, Validators.required],
      childId: [],
      studentName: this.fb.group({
        ar:['', Validators.required],
        en:['', Validators.required]
      }),
      studentSurName: this.fb.group({
        ar: ['', Validators.required],
        en: ['', Validators.required]
      }),
      gender:["", Validators.required],
      birthDate:["", Validators.required],
      nationalityId:["", Validators.required],
      religionId:["", Validators.required]
    })


    repeateStudyPhaseReqForm={
      studentId: this.childId ||this.studentId,
      schoolId: null,
      gradeId: null,
      requestReasonId: null
    }

    
    exemptionFromStudySubjectReqForm={
      studentId: this.childId ||this.studentId,
      subjectId: null
    }

  constructor(
    private fb:FormBuilder,
    private translate:TranslateService,
    private studentsService: StudentsService,
    private countriesService: CountriesService,
    private divisionService:DivisionService,
    private gradeService:GradesService,
    private route: ActivatedRoute,
    public childService:RegisterChildService,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private userService:UserService,
    private router:Router,
    private settingServcice:SettingsService,
    private indexesService:IndexesService) { }

    onEditMode


  ngOnInit(): void {
    this.childService.onEditMode$.subscribe(res=>{
      this.onEditMode = res ? true : false
    })


    this.childService.submitBtnClicked$.pipe(takeUntil(this.ngDestroy$)).subscribe(val =>{
      
      if(val && this.step!=4  &&  this.step!=7) this.updateStudent(this.studentId || this.childId)
    })

    if(this.childId) this.getStudent(this.childId)
    else this.getStudent(this.studentId)
  }



  ngAfterViewInit() {
    setTimeout(()=> this.setActiveTab(0))
    		
	}



  getStudent(studentId){

    this.childService.Student$.next(null)
    this.studentsService.getStudent(studentId).subscribe((res) =>{
      this.schoolId = res.result.school?.id || 2
      this.gradeId = res.result.grade?.id || 1
      res.result.birthDate = new Date(res.result.birthDate)
      res.result.passportIdExpirationDate = new Date(res.result.passportIdExpirationDate)
      this.currentStudent = res.result
      this.childService.Student$.next(res.result)
      this.studentForm.patchValue(res.result as any)
      this.studentForm.controls.prohibited.patchValue(res.result?.studentProhibited)
      this.studentForm.controls.nationalityId.setValue(res.result.nationality?.id)
      this.studentForm.controls.reasonForNotHavingEmiratesId.setValue(null)
      this.currentStudentDivision = res.result.division
      this.transferStudentForm.currentDivisionId = res.result.division.id

      this.initializeState(res.result)
    });
    
  }
  
  submitButtonClicked(){

    this.childService.submitBtnClicked$.next(true)
  }
  initializeState(student){
    this.gradeDivisions$ = this.gradeService.getGradeDivision(this.schoolId, this.gradeId)
    .pipe(
      map((res:any) =>{
        if(res?.data) return res.data.filter(val=> val.id!=this.currentStudentDivision.id)
        return []
      }),
       share());

    this.subjectsExemption$ = this.studentsService.getStudentSubjectsThatAllowedToExemption({schoolId:this.schoolId, gradeId:this.gradeId, studentId:this.studentId||this.childId})
  }

  updateStudent(studentId){
    this.studentsService.updateStudent(this.studentId || this.childId,this.studentForm.value)
    .pipe(finalize(()=> {
      this.childService.submitBtnClicked$.next(null)
      this.childService.onEditMode$.next(false)
    }))
    .subscribe(res=>{
      this.toastr.success('تم التعديل بنجاح')
      this.getStudent(studentId)



    },err =>{this.toastr.error('التعديل لم يتم يرجى المحاوله مره اخرى')})
  } 


  // Transfer Student To Another Division Logic
  // ==============================================

  onTargetDivisionSelected(division){
    this.targetDivision = division
    if(division.hasTrack) {
      this.divisionTracks$= this.divisionService.getDivisionTracks(division.id)
    }
    else {
      // this.optionalSubjects$ = this.sharedService.getAllOptionalSubjects({schoolId: this.currentStudent.school.id,gradeId:this.currentStudent.grade.id,trackId:""})
      this.getSubjects({schoolId: this.currentStudent.school.id, gradeId:this.currentStudent.grade.id, trackId: ""})

      this.transferStudentForm.trackId =null
    }

    if(division.isAcceptStudent) this.transferStudentForm.updatedDivisionId= division.id
    else this.transferStudentForm.updatedDivisionId= null
  }


  onTrackSelected(trackId){
    this.isTrackSelected =true
    // this.optionalSubjects$ = this.sharedService.getAllOptionalSubjects({schoolId: this.currentStudent.school.id,gradeId:this.currentStudent.grade.id,trackId: trackId})
    this.getSubjects({schoolId: this.currentStudent.school.id, gradeId:this.currentStudent.grade.id, trackId: trackId})

  }

  
  getSubjects(parms){
    this.optionalSubjectsList=null
    this.sharedService.getAllOptionalSubjects(parms).subscribe(res=>{
      this.optionalSubjectsList =res
    })
  }

  // نقل الطالب من شعبه لشعبه
  transferStudent(){
    this.onSubmit =true
    this.divisionService.transferStudentToAnotherDivision(this.transferStudentForm)
    .pipe(
      catchError(()=>{
        return throwError(()=> new Error(this.translate.instant('toasterMessage.transferStudentFaild')))
      })
    )
    .subscribe((res)=>{
      this.getStudent(this.studentId)
      this.toastr.success(this.translate.instant('toasterMessage.studentTransfered'))
      this.onSubmit =false
      this.transferStudentModelOpened = false

    },(err:Error) =>{
      this.onSubmit =false
      this.toastr.error(err.message)

    })
  }

// =======================================================


  // ارسال طلب تعديل هويه
  updateIdentity(newIdentityData){
    this.onSubmit=true
    this.studentsService.updateStudentIdentityNum(newIdentityData)
    .pipe(
      map(res => {
        if(!res.error) return res
        else throw new Error(res.error)
      })
    ).subscribe(res=> {

      this.changeIdentityNumModelOpened =false
      this.onSubmit=false
      this.toastr.success(this.translate.instant('toasterMessage.requestSendSuccessfully'))

    }, (err:Error) =>{ 
      this.changeIdentityNumModelOpened =false
      this.onSubmit=false
      this.toastr.error(this.translate.instant('toasterMessage.'+err.message))
      
    })
  }

  updateIdentityInfoReq(newIdentityInfo){
    this.onSubmit=true
    this.studentsService.updateStudentIdentityInfo(newIdentityInfo)
    .pipe(
      map(res => {
        if(!res.error) return res
        else throw new Error(res.error)
      })
    ).subscribe(res=> {
      this.changeStudentIdentityInfoModelOpened =false
      this.onSubmit=false
      this.toastr.success(this.translate.instant('toasterMessage.requestSendSuccessfully'))
    }, err =>{ 
      this.changeStudentIdentityInfoModelOpened =false
      this.onSubmit=false
      this.toastr.error(err)
    })
  }

  getWithdrawRequestRequiresFiles(){
    this.settingServcice.getRequestRquiredFiles(requestTypeEnum.ModifyIdentityRequest).subscribe(res=>{
      this.requiredFiles = res.result
    })
  }

  // ==============================================


  // NOTE : ارسال طلب اعاده مرحله دراسيه -------------------------------------------------
  sendRepeateStudyPhaseReq(){
    let reqBody = {...this.repeateStudyPhaseReqForm, schoolId: this.schoolId, gradeId:this.gradeId}
    this.onSubmit=true
    this.studentsService.repeateStudyPhaseReq(reqBody).subscribe(()=>{
      this.toastr.success(this.translate.instant('toasterMessage.requestSendSuccessfully'))
      this.RepeateStudyPhaseModelOpend=false
      this.onSubmit=false
    },()=>{
      this.toastr.error(this.translate.instant('toasterMessage.error'))
      this.onSubmit=false
    })
  }

    // NOTE : ارسال طلب  الاعفاء من ماده دراسيه -------------------------------------------------
    sendExemptionFromStudySubjectReq(){
      let reqBody = {...this.exemptionFromStudySubjectReqForm, schoolId: this.schoolId, gradeId:this.gradeId}
      this.onSubmit=true
      this.studentsService.exemptionFromStudySubjectReq(reqBody).subscribe(()=>{
        this.toastr.success(this.translate.instant('toasterMessage.requestSendSuccessfully'))
        this.RepeateStudyPhaseModelOpend=false
        this.onSubmit=false
      },()=>{
        this.toastr.error(this.translate.instant('toasterMessage.error'))
        this.onSubmit=false
      })
    }
  


  dropdownItemClicked(index){
    if (index== 3) this.RepeateStudyPhaseModelOpend=true
    if (index== 4) {
      if (!this.currentStudent.emiratesId)this.changeStudentIdentityInfoModelOpened=true
      else this.changeIdentityNumModelOpened=true
      
    }
    if (index== 5) this.childService.showWithdrawalReqScreen$.next(true)
    if(index==6) this.exemptionFromStudyModelOpend=true
  }





	// Set Default Active Tab In Case Any tab Element Removed From The Dom For permissions Purpose
	setActiveTab(nodeIndex?){
		let navItemsList =this.nav.nativeElement.children

		if(nodeIndex == 0 && navItemsList.length){
			navItemsList[nodeIndex]?.classList.add('active')
			this.navListLength = navItemsList.length
      if(navItemsList[0]?.dataset.step) this.step = navItemsList[0]?.dataset.step
      else this.step = 1
		}
	}


	scrollLeft(el :ElementRef){
    let stepLength = this.lang =='ar' ? (this.nav.nativeElement.scrollLeft - 175) : (this.nav.nativeElement.scrollLeft + 175)

		this.nav.nativeElement.scrollTo({left: stepLength, behavior:'smooth'})
		this.hideNavControl = false;
	}

	scrollRight(el :ElementRef){
    let stepLength = this.lang =='ar' ?(this.nav.nativeElement.scrollLeft + 175) : (this.nav.nativeElement.scrollLeft - 175)

		this.nav.nativeElement.scrollTo({left:stepLength, behavior:'smooth'})
		if(this.nav.nativeElement.scrollLeft === 0) this.hideNavControl = true;

	}

  ngOnDestroy(): void {
    this.ngDestroy$.next(null)
    this.ngDestroy$.complete()
    this.childService.onEditMode$.next(false)
  }

  showDialog() {
      this.display = true;
    }
    
    closeDialog(){
      this.display = false;
      this.router.navigate(['/dashboard/messages/messages'])
    }

}
