import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { IHeader } from 'src/app/core/Models';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IndexesService } from '../../../modules/indexes/service/indexes.service';
import { UserScope } from '../../enums/user/user.enum';
import { ParentService } from 'src/app/modules/parants/services/parent.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ToastrService } from 'ngx-toastr';
import { RegistrationStatus } from '../../enums/status/status.enum';
import { CustomFile } from '../file-upload/file-upload.component';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SystemRequestService } from 'src/app/modules/request-list/services/system-request.service';
import { WorkflowOptions } from 'src/app/core/models/system-requests/requests.model';
import { catchError, map, switchMap, throwError,combineLatest } from 'rxjs';
import { SettingsService } from 'src/app/modules/system-setting/services/settings/settings.service';
import { requestTypeEnum } from '../../enums/system-requests/requests.enum';
import { FileRule, RequestRule } from 'src/app/core/models/settings/settings.model';
import { HttpStatusCodeEnum } from '../../enums/http-status-code/http-status-code.enum';
import { StudentsService } from 'src/app/modules/students/services/students/students.service';
import { FirstGradeCodeEnum, FoundationStage, preschools } from '../../enums/school/school.enum';
import { StudentAttachments } from 'src/app/core/models/student/student.model';

type ClassType= 'FusionClass' | 'SpecialClass'

@Component({
  selector: 'app-register-request',
  templateUrl: './register-request.component.html',
  styleUrls: ['./register-request.component.scss']
})
export class RegisterRequestComponent implements OnInit {
  childData
  lang = this.translationService.lang
  scope = inject(UserService).getScope()
  get ScopeEnum(){ return UserScope}
  get registrtionStatusEnum () {return RegistrationStatus}
  get currentUserScope (){return this.userService.getScope()}

  parentId = +this.route.snapshot.paramMap.get('parentId')
  childId =  this.route.snapshot.paramMap.get('childId')
  studentId =  this.route.snapshot.paramMap.get('studentId')
  childRegistrationStatus = this.route.snapshot.queryParamMap.get('status')

  // NOTE:- incase the Request is returned Form Spea
  requestId = this.route.snapshot.queryParamMap.get('requestId')
  returnedReqData = JSON.parse(localStorage.getItem('returnedRequest'))
  reqInstantId = this.route.snapshot.queryParamMap.get('instantId')
  actions:WorkflowOptions[]
  //-------------------------------------

  componentHeaderData: IHeader



  booleanOptions = this.sharedService.booleanOptions
  disabilitiesOptions = [
    {name: this.translate.instant('shared.specialClass'), value:'SpecialClass'},
    {name: this.translate.instant('shared.fusionClass'), value: 'FusionClass'}
  ]

  educationType$ = this.indexService.getIndext(IndexesEnum.SpecialEducation)

  filtration :SearchModel = {...BaseSearchModel, curriculumId:'', StateId: '',GradeId:''}
  paginationState= {...paginationInitialState}


  AllGrades
  curriculums$ = this.sharedService.getAllCurriculum()
  states$ = this.countriesService.getAllStates()


  schools={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }

  submitted

  requiredFiles:Partial<RequestRule>



  selectedSchoolId
  selectedGrade

    // ارسال طلب تسجيل للابن او الطالب المنسحب
  registerReqForm:FormGroup


  classType:ClassType

  constructor(
    private translate: TranslateService,
    private translationService:TranslationService,
    private headerService: HeaderService,
    private sharedService: SharedService,
    private countriesService:CountriesService,
    private indexService:IndexesService,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private _parent:ParentService,
    private userService:UserService,
    private toaster:ToastrService,
    private requestsService:SystemRequestService,
    private router:Router,
    private settingServcice:SettingsService,
    private studentService:StudentsService
  ) { }

  ngOnInit(): void {

    this.prepareHeaderData()
    this.getStudentInfo()

    // this.getRegistrationRequiresFiles()

  }




  getStudentInfo(){
    if(this.childRegistrationStatus==RegistrationStatus.Withdrawal){
      this.studentService.getStudent(this.route.snapshot.params['childId'])
      .subscribe(res=>{
        this.childData = res.result
        this.getGrades()
        // this.initRegisterationForm(res?.result)
      })

    }else{
      this._parent.getChild(this.route.snapshot.params['childId'])
      .subscribe(res=>{
        this.childData = res
        this.getGrades()
        // this.initRegisterationForm(res)
      })
    }
  }

initRegisterationForm(child){
  console.log(child);

  this.registerReqForm = this.fb.group({
    id:[],
    childId:[child?.id],
    studentId:[this.childRegistrationStatus==RegistrationStatus.Withdrawal ? child?.id : null],
    guardianId:[this.parentId],
    schoolId:[null,Validators.required],
    gradeId: [null,Validators.required],
    studentStatus:[this.childRegistrationStatus==RegistrationStatus.Withdrawal?RegistrationStatus.Withdrawal : RegistrationStatus.Unregistered ],
    isChildOfAMartyr:[null,Validators.required],
    isSpecialAbilities:[null,Validators.required],
    isSpecialClass:[null],
    isInFusionClass:[null],
    // isSpecialEducation:[null,Validators.required],
    specialEducationId:[null],
    attachments:[[]],
  })


  if(this.scope==UserScope.Guardian) {
    this.parentId = this.userService.getCurrentGuardian()?.id
    this.registerReqForm.controls['guardianId'].setValue(this.parentId)
  }

  this.childRegistrationStatus==RegistrationStatus.Withdrawal && this.setSelectedGradeForWithdrawalStudent()

  this.initValidation()

}

  initValidation(){
    let ctrs = ['isChildOfAMartyr','isSpecialAbilities']
    ctrs.forEach(el => {
      if(this.childRegistrationStatus==RegistrationStatus.Withdrawal || this.scope ==this.ScopeEnum.SPEA) {
        let ctr = this.registerReqForm.controls[el] as FormControl
        ctr.removeValidators(Validators.required)
        ctr.updateValueAndValidity()
      }

    })

  }


  setSelectedGradeForWithdrawalStudent(){

    this._parent.getSelectedGradeForWithdrawalStudent(this.childId || this.studentId)
    .pipe(
      map(res=> {
        if(res.statusCode==HttpStatusCodeEnum.BadRequest) throw  new Error()
        else return res
      }),
      map(res => res.result),
      )
    .subscribe(res=>{
      this.selectedGrade=res
      this.registerReqForm.controls['gradeId'].setValue(res?.id)
      this.onGradeSelected(res.id)
      // this.onGradeSelected(res.id)
    },err =>{
      // this.onGradeSelected(2)
      // this.registerReqForm.controls['gradeId'].setValue(2)
    })
  }

  getRegistrationRequiresFiles(gradeId){

    this.settingServcice.getRegisterRequestRequiredAttach(gradeId).subscribe(res=>{
      this.requiredFiles = res.result || {filesCount: 0, isRequired: false, files:[]}
      this.requiredFiles.files = this.requiredFiles.files.map(el =>({...el, uploadedFiles:[]}))
      if(this.requestId) this.setUploadedFiles()
    },err=>{
      this.requiredFiles = {filesCount: 0, isRequired: false, files:[]}
    })
  }

  getRequestOptions(){
    this.requestsService.getRequestOptions(this.reqInstantId).subscribe(res=>{
      this.actions = res?.options
    })
  }

  patchReturnedRequestData(reqData){
    if(reqData?.isSpecialAbilities) {
      reqData.isInFusionClass ? this.classType='FusionClass':this.classType='SpecialClass'
    }

    this.onGradeSelected(reqData.grade?.id)
    this.registerReqForm.controls['gradeId'].setValue(reqData.grade?.id)
    this.onSelectSchool(reqData.school?.id)
    this.attachments = reqData?.attachments || []
    // this.setUploadedFiles()
    this.registerReqForm.patchValue(reqData)

  }


  onClassTypeChange(value:ClassType){
    if(value== 'FusionClass') {
      this.registerReqForm.controls['isSpecialClass'].setValue(false)
      this.registerReqForm.controls['isInFusionClass'].setValue(true)
    }
    else if(value== 'SpecialClass'){
      this.registerReqForm.controls['isSpecialClass'].setValue(true)
      this.registerReqForm.controls['isInFusionClass'].setValue(false)
    }
  }

  resetSpecialClass(value){
    if(!value)  {
      this.classType=null
      this.registerReqForm.controls['isSpecialClass'].setValue(null)
      this.registerReqForm.controls['isInFusionClass'].setValue(null)
    }

  }




  getGrades(curriculumsId=''){
    this.sharedService.getAllGrades('', curriculumsId).subscribe(res=> {
    this.AllGrades=res || []

    if(!this.registerReqForm) this.initRegisterationForm(this.childData)

      if(this.requestId) {
        this.patchReturnedRequestData(this.returnedReqData)
        this.getRequestOptions()
      }
    })
  }

  onCurriculumSelected(id){
    this.filtration.GradeId=null
    this.registerReqForm.controls['gradeId'].setValue(null)
    this.getGrades(id)
  }



  onGradeSelected(gradeId){

    if(gradeId){
      this.selectedGrade = this.AllGrades.filter(el => el.id ==gradeId)[0]
      this.filtration.GradeId = gradeId
      this.getRegistrationRequiresFiles(gradeId)

      // if(preschools.includes(this.selectedGrade?.code)) this.getRegistrationRequiresFiles(requestTypeEnum.KgRegestrationApplicationRequest)
      // else if(FoundationStage.includes(this.selectedGrade?.code)) this.getRegistrationRequiresFiles(requestTypeEnum.PrimarySchoolRegestrationApplicationRequest)
      // else this.getRegistrationRequiresFiles()
    }
    if(this.childRegistrationStatus!=RegistrationStatus.Withdrawal) this.selectedSchoolId =null

    this.getSchools()
  }


  getSchools(){
    this.schools.loading=true
    this.schools.list=[]

    this.settingServcice.schoolsAllowedForRegistration(this.filtration)
    .pipe(map(res => res.result))
    .subscribe(res =>{
      this.sharedService.filterLoading.next(false);
      this.schools.loading = false
      this.schools.list = res.data
      this.schools.totalAllData = res.totalAllData
      this.schools.total =res.total

    },err=> {
      this.schools.loading=false
      this.schools.total=0
      this.sharedService.filterLoading.next(false);
    })
  }


  onSelectSchool(schoolId) {

    this.selectedSchoolId =schoolId
    this.registerReqForm.controls['schoolId'].setValue(schoolId)
  }


  attachments :StudentAttachments[] = []
  get uploadedFiles(){ return [].concat(...this.requiredFiles.files.map((el:FileRule) => el.uploadedFiles.map((item:[]) => ({...item, ruleFileId: el.ruleFileId}) )))}


  onFileUpload(files, fileTitle, index){
    this.requiredFiles.files[index].uploadedFiles = files.length ? files.map(el=>({...el, title:fileTitle})) : files

    this.attachments= this.uploadedFiles
    // if(uploadedFiles.length) this.attachments[index]= {Titel:file.name, ...uploadedFiles[0]}
   }

   setUploadedFiles(){

    this.attachments.forEach((file:any , i) =>{
      let index = this.requiredFiles.files.findIndex(el => el.ruleFileId == file.ruleFileId)

      this.requiredFiles?.files[index]?.uploadedFiles.push(this.attachments[i])
    })
    this.requiredFiles.files =[...this.requiredFiles.files]
   }


   onFileDelete(files, fileIndex, uploaderIndex){
    this.requiredFiles.files[uploaderIndex].uploadedFiles.splice(fileIndex,1)
    this.attachments= this.uploadedFiles

   }




   onSubmit=false
  sendRegisterRequest(){
    this.onSubmit=true
    this.registerReqForm.controls['attachments'].setValue(this.attachments)

    this._parent.sendRegisterRequest(this.registerReqForm.value)
    .pipe(
      catchError(()=>{
        return throwError(()=> new Error(this.translate.instant('toasterMessage.error')))
      }),
      map(res=>{
        if(res.statusCode==HttpStatusCodeEnum.BadRequest){
          let mes = this.translate.instant(`toasterMessage.${res?.error ||'error'}`)
          throw new Error(mes)
        }else{
          return res
        }
      })
    )
    .subscribe(res=>{
      this.toaster.success(this.translate.instant('toasterMessage.requestSendSuccessfully'))
      this.onSubmit=false
      this.router.navigate(['/requests-list'])

    },(err:Error)=>{
      this.toaster.error(err.message)
      this.onSubmit=false
    })

  }

  updateRegistrationReq(optionId){
    this.onSubmit=true
    this.registerReqForm.controls['attachments'].setValue(this.attachments)

    this._parent.updateRegisterRequest(this.registerReqForm.value)
    .pipe(
      switchMap(()=>{
        let reqActionsForm={
          comments:'',
          optionId: optionId,
          rejectionReasonId: null,
          rejectionReason:'',
          attachments:[]
        }
        return this.requestsService.changeRequestState(reqActionsForm)
      })
    )
    .subscribe(res=>{
      this.toaster.success(this.translate.instant('toasterMessage.requestResend'));
      this.onSubmit=false
      localStorage.removeItem('returnedRequest')
      this.router.navigate(['/requests-list/details', this.reqInstantId])
    },err=>{
      this.toaster.error(this.translate.instant('toasterMessage.error'))
      this.onSubmit=false
        // this.router.navigate(['/'])
    })
  }


  registerChildWithSpea(){
    this.onSubmit=true

    let data = {
      attachmentPaths:this.attachments,
      gradeId:this.selectedGrade.id,
      schoolId: this.registerReqForm.controls['schoolId'].value
    };

    this._parent.registerChildBySpea(this.childRegistrationStatus,this.childId, data)
    .subscribe(res=>{

      this.onSubmit=false
      this.router.navigateByUrl(`/schools-and-students/all-parents/parent/${this.parentId}/all-children`)
      this.toaster.success(this.translate.instant('toasterMessage.childRegistedSuccesfully'))
    },(err)=>{
      this.toaster.error(this.translate.instant('toasterMessage.error'))

      this.onSubmit=false
    })


  }




  isRequiredAttchmentsUploaded(){
    return !this.requiredFiles?.files.filter(el => el.isMandatory).every(el=> el?.uploadedFiles?.length > 0)
  }

  clearFilter(){
    this.filtration.Page=1
    this.filtration.KeyWord =''
    this.filtration.StateId= null
    this.filtration.curriculumId = null
    this.getSchools()
  }

  paginationChanged(event: paginationState) {
    this.filtration.Page = event.page
    this.filtration.PageSize = event.rows
    this.getSchools()

  }


  prepareHeaderData(){
    if(this.currentUserScope== this.ScopeEnum.Guardian){
      this.componentHeaderData = {
        breadCrump: [
          { label: this.translate.instant('dashboard.parents.sendRegisterReq') ,routerLink:`/parent/child/${this.childId}/register-request`,},
        ],
        mainTitle: { main: this.translate.instant('dashboard.parents.sendRegisterReq') }
      }

    }else{

      this.componentHeaderData={
        breadCrump: [
          { label: this.translate.instant('dashboard.parents.parents') ,routerLink:'//schools-and-students/all-parents/',routerLinkActiveOptions:{exact: true}},
          { label: this.translate.instant('dashboard.parents.childrenList') ,routerLink:`//schools-and-students/all-parents/parent/${this.parentId}/all-children`,routerLinkActiveOptions:{exact: true}},
          {label: this.translate.instant('dashboard.students.registerChildByCommission'), routerLink: `//schools-and-students/all-parents/parent/${this.parentId}/child/${this.childId}/register`}
        ],
        mainTitle: {
          main: this.translate.instant('dashboard.students.registerChildByCommission')
        }
      }
    };

    this.headerService.changeHeaderdata(this.componentHeaderData)
  }


}
