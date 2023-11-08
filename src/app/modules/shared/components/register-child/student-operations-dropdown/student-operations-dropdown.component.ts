import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, share } from 'rxjs';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { OptionalSubjects, Division, Track } from 'src/app/core/models/global/global.model';
import { RequestRule } from 'src/app/core/models/settings/settings.model';
import { Student } from 'src/app/core/models/student/student.model';
import { ClaimsService } from 'src/app/core/services/claims.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { GracePeriodEnum } from 'src/app/shared/enums/settings/settings.enum';
import { RegistrationStatus } from 'src/app/shared/enums/status/status.enum';
import { requestTypeEnum } from 'src/app/shared/enums/system-requests/requests.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IndexesService } from '../../../../indexes/service/indexes.service';
import { DivisionService } from '../../../../schools/services/division/division.service';
import { GradesService } from '../../../../schools/services/grade/grade.service';
import { StudentsService } from '../../../../students/services/students/students.service';
import { SettingsService } from '../../../../system-setting/services/settings/settings.service';
import { StudentService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-student-operations-dropdown',
  templateUrl: './student-operations-dropdown.component.html',
  styleUrls: ['./student-operations-dropdown.component.scss']
})
export class StudentOperationsDropdownComponent implements OnInit, OnChanges {

  @Input() student! :Student
  @Output() refreshStudent = new EventEmitter()

  lang =inject(TranslationService).lang;
  get userScope() { return UserScope }
  currentUserScope = inject(UserService).getScope();
  get claimsEnum(){ return ClaimsEnum }
  get registrationStatusEnum() {return RegistrationStatus}
  get fileTypesEnum () {return FileTypeEnum}

  studentGUID = this.route.snapshot.paramMap.get('id')
  childId = this.route.snapshot.paramMap.get('childId')

  schoolId ;
  gradeId;


  items: MenuItem[]

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



    // Forms
    requiredFiles:RequestRule
    get uploadedFiles(){ return [].concat(...this.requiredFiles.files.map(el => el.uploadedFiles))}
    changeIdentityNumForm
    transferStudentForm
    changeStudentInfoReqForm
    repeateStudyPhaseReqForm
    exemptionFromStudySubjectReqForm



  optionalSubjectsList:OptionalSubjects[]
  // schoolDivisions$ = this.schoolsService.getSchoolDivisions(2).pipe(map(val =>val.data), share())
  currentStudentDivision:Division
  gradeDivisions$ :Observable<Division>
  divisionTracks$ :Observable<Track>

  targetDivision:Division
  isTrackSelected =false

  onSubmit =false

  displayStudentActionbtn:boolean=false

  constructor(
    private fb:FormBuilder,
    private translate:TranslateService,
    private studentsService: StudentsService,
    private divisionService:DivisionService,
    private gradeService:GradesService,
    private route: ActivatedRoute,
    public childService:StudentService,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private settingServcice:SettingsService,
    private cliamsService:ClaimsService,
    private indexesService:IndexesService,
    private countriesService:CountriesService
  ) { }



  ngOnChanges(changes: SimpleChanges): void {
    this.items=[
      {label: this.translate.instant('dashboard.students.transferStudentToAnotherSchool'), icon:'assets/images/shared/student.svg',routerLink:`/schools-and-students/students/student/${this.studentGUID}/transfer`,claims:ClaimsEnum.S_TransferStudentToAnotherSchool},
      {label: this.translate.instant('dashboard.students.IssuanceOfACertificate'), icon:'assets/images/shared/certificate.svg',routerLink:'IssuanceOfACertificateComponent',claims:ClaimsEnum.S_StudentCertificateIssue},
      {label: this.translate.instant('dashboard.students.sendStudentDeleteRequest'), icon:'assets/images/shared/delete.svg',routerLink:`../../delete-student/${this.studentGUID}`,claims:ClaimsEnum.E_DeleteStudentRequest},
      {
        label: this.translate.instant('dashboard.students.sendRepeateStudyPhaseReqest'),
        isAllowed$ :this.settingServcice.isSchoolExistInGracePeriod({schoolId: this.student?.school?.id, code: GracePeriodEnum.repeatStudyPhase}),
        icon:'assets/images/shared/file.svg',claims:ClaimsEnum.G_RepeatStudyPhaseRequest
      },
      {label: this.translate.instant('dashboard.students.sendRequestToEditPersonalInfo'), icon:'assets/images/shared/user-badge.svg',claims:ClaimsEnum.GE_ChangePersonalIdentityReqest},
      {
        label: this.translate.instant('dashboard.students.sendWithdrawalReq'), icon:'assets/images/shared/list.svg',
        disabled: this.student?.studentStatus === RegistrationStatus.Withdrawal ||this. student?.studentProhibited?.withdrawingFromSchool || this.student?.studentProhibited?.withdrawingFromSPEA,
        claims:ClaimsEnum.G_WithdrawingStudentFromCurrentSchool,
        routerLink:`${this.currentUserScope==this.userScope.Guardian ? 'withdraw-request'
        : this.currentUserScope==this.userScope.Employee ? ('/student-management/students/student/' + (this.studentGUID) + '/withdraw-request')
        :('/schools-and-students/students/student/' + (this.studentGUID) + '/withdraw-request')}`
      },
      {label: this.translate.instant('dashboard.students.exemptionFromSubjectStudey'), icon:'assets/images/shared/file.svg', claims:ClaimsEnum.G_ExemptionFromStudySubjectReqest},
      {
        label: this.translate.instant('breadcrumb.Request to issue a certificate'),
        disabled: this.student?.studentProhibited?.rCertificateFromSPEA || this.student?.studentProhibited?.certificateFromSchool,
        icon:'assets/images/shared/file.svg',
        claims:ClaimsEnum.G_CertificateIssuranceRequest,
        routerLink:`/certificates/ask-certificate/${this.student?.id}`
      }
    ];
  }

  ngOnInit(): void {

    this.items.forEach(element => {
      if(this.cliamsService.isUserAllowedTo(element.claims))
      {this.displayStudentActionbtn=true}
    });


    this.initializeState(this.student)

  }


  initializeState(student:Student){
    this.schoolId = student.school?.id
    this.gradeId = student.grade?.id
    this.currentStudentDivision = student?.division

    // this.transferStudentForm.currentDivisionId = student?.division?.id

    this.gradeDivisions$ = this.gradeService.getGradeDivision(this.schoolId, this.gradeId)
    .pipe(
      map((res:any) =>{
        if(res?.data) return res.data.filter(val=> val.id!=this.currentStudentDivision.id)
        return []
      }),
       share());

    this.subjectsExemption$ = this.studentsService.getStudentSubjectsThatAllowedToExemption({schoolId:this.schoolId, gradeId:this.gradeId, studentId: student?.id})

      this.initForms(student)

  }


  initForms(student){

    this.transferStudentForm={
      studentId: student?.id,
      currentDivisionId: student?.division?.id,
      updatedDivisionId: null,
      trackId: '',
      electiveSubjectId: []
    }
    // --------------------------------------------------------
    this.changeIdentityNumForm={
      identityNumber: null,
      attachments:[],
      studentId: student?.id,
      childId : null
    }
    // --------------------------------------------------------
    this.changeStudentInfoReqForm= this.fb.group({
      studentId: [student?.id, Validators.required],
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
    // --------------------------------------------------------
    this.repeateStudyPhaseReqForm={
      studentId: student?.id,
      schoolId: null,
      gradeId: null,
      requestReasonId: null
    }
    // -----------------------------------------------------------
    this.exemptionFromStudySubjectReqForm={
      studentId: student.id,
      subjectId: null
    }

  }


   // Transfer Student To Another Division Logic
  // ==============================================

  onTargetDivisionSelected(division){
    this.targetDivision = division
    if(division.hasTrack) {
      this.divisionTracks$= this.divisionService.getDivisionTracks(division.id)
    }
    else {
      // this.optionalSubjects$ = this.sharedService.getAllOptionalSubjects({schoolId: this.student?.school.id,gradeId:this.student?.grade.id,trackId:""})
      this.getSubjects({schoolId: this.student?.school.id, gradeId:this.student?.grade.id, trackId: ""})

      this.transferStudentForm.trackId =null
    }

    if(division.isAcceptStudent) this.transferStudentForm.updatedDivisionId= division.id
    else this.transferStudentForm.updatedDivisionId= null
  }


  onTrackSelected(trackId){
    this.isTrackSelected =true
    // this.optionalSubjects$ = this.sharedService.getAllOptionalSubjects({schoolId: this.student?.school.id,gradeId:this.student?.grade.id,trackId: trackId})
    this.getSubjects({schoolId: this.student?.school.id, gradeId:this.student?.grade.id, trackId: trackId})

  }


  getSubjects(parms){
    this.optionalSubjectsList=null
    this.sharedService.getAllOptionalSubjects(parms).subscribe(res=>{
      this.optionalSubjectsList =res
    })
  }

  transferStudent(){
    this.onSubmit =true
    this.divisionService.transferStudentToAnotherDivision(this.transferStudentForm)
    .subscribe((res)=>{
      this.refreshStudent.emit()
      this.toastr.success(this.translate.instant('toasterMessage.studentTransfered'))
      this.onSubmit =false
      this.transferStudentModelOpened = false

    },(err:Error) =>{
      this.onSubmit =false
      this.toastr.error(err.message || this.translate.instant('toasterMessage.error'))

    })
  }

// =======================================================


  // ارسال طلب تعديل هويه
  updateIdentity(newIdentityData){
    this.onSubmit=true
    this.studentsService.updateStudentIdentityNum(newIdentityData)
    .subscribe(res=> {

      this.changeIdentityNumModelOpened =false
      this.onSubmit=false
      this.toastr.success(this.translate.instant('toasterMessage.requestSendSuccessfully'))

    }, (err:Error) =>{
      this.changeIdentityNumModelOpened =false
      this.onSubmit=false
      this.toastr.error(err?.message || this.translate.instant('toasterMessage.error'))


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

  getModifyIdentityRequestRequiresFiles(){
    this.settingServcice.getRequestRquiredFiles(requestTypeEnum.ModifyIdentityRequest).subscribe(res=>{
      this.requiredFiles = res.result || {filesCount: 0, isRequired: false, files:[]}
      this.requiredFiles.files = this.requiredFiles.files.map(el =>({...el, uploadedFiles:[]}))
    })
  }



  isRequiredAttchmentsUploaded(){
    return !this.requiredFiles.files.filter(el => el.isMandatory).every(el=> el?.uploadedFiles?.length > 0)
  }

  onFileUpload(files, fileTitle, index){
    this.requiredFiles.files[index].uploadedFiles = files.length ? files.map(el=>({...el, title:fileTitle})) : files
    this.changeIdentityNumForm.attachments = this.uploadedFiles
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
    },(err:Error)=>{
      this.toastr.error(err.message || this.translate.instant('toasterMessage.error'))
      this.onSubmit=false
    })
  }

    // NOTE : ارسال طلب  الاعفاء من ماده دراسيه -------------------------------------------------
    sendExemptionFromStudySubjectReq(){
      let reqBody = {...this.exemptionFromStudySubjectReqForm}
      this.onSubmit=true
      this.studentsService.exemptionFromStudySubjectReq(reqBody).subscribe(()=>{
        this.toastr.success(this.translate.instant('toasterMessage.requestSendSuccessfully'))
        this.exemptionFromStudyModelOpend=false
        this.onSubmit=false
      },()=>{
        this.exemptionFromStudyModelOpend=false
        this.toastr.error(this.translate.instant('toasterMessage.error'))
        this.onSubmit=false
      })
    }





  dropdownItemClicked(index){
    if (index== 3) this.RepeateStudyPhaseModelOpend=true
    if (index== 4) {
      if (!this.student?.emiratesId)this.changeStudentIdentityInfoModelOpened=true
      else {
        this.getModifyIdentityRequestRequiresFiles()
        this.changeIdentityNumModelOpened=true
      }

    }
    // if (index== 5) this.childService.showWithdrawalReqScreen$.next(true)
    if(index==6) this.exemptionFromStudyModelOpend=true
  }


}
