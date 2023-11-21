import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { IHeader } from 'src/app/core/Models';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { RequestRule, FileRule } from 'src/app/core/models/settings/settings.model';
import { StudentAttachments } from 'src/app/core/models/student/student.model';
import { WorkflowOptions } from 'src/app/core/models/system-requests/requests.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IndexesService } from 'src/app/modules/indexes/service/indexes.service';
import { ParentService } from 'src/app/modules/parants/services/parent.service';
import { SystemRequestService } from 'src/app/modules/request-list/services/system-request.service';
import { StudentsService } from 'src/app/modules/students/services/students/students.service';
import { SettingsService } from 'src/app/modules/system-setting/services/settings/settings.service';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { RegistraterRequestStatus, StudentStatus } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';

type ClassType= 'FusionClass' | 'SpecialClass'

@Component({
  selector: 'app-return-request',
  templateUrl: './return-request.component.html',
  styleUrls: ['./return-request.component.scss']
})
export class ReturnRequestComponent implements OnInit {

  childData
  lang = this.translationService.lang
  scope = inject(UserService).getScope()
  get ScopeEnum(){ return UserScope}
  get registrtionStatusEnum () {return StudentStatus}
  get currentUserScope (){return this.userService.getScope()}

  parentId = +this.route.snapshot.paramMap.get('parentId')
  childId =  this.route.snapshot.paramMap.get('childId')
  studentId =  this.route.snapshot.paramMap.get('studentId')
  childRegistrationStatus = this.route.snapshot.queryParamMap.get('status')

  // NOTE:- incase the Request is returned Form Spea
  // requestId = this.route.snapshot.queryParamMap.get('instanceId')
  returnedReqData = JSON.parse(localStorage.getItem('returnedRequest'))
  // instanceId = this.route.snapshot.queryParamMap.get('instantId')
  instanceId = this.route.snapshot.params['instanceId']
  actions:WorkflowOptions[]
  //-------------------------------------

  componentHeaderData: IHeader


  registrationStatusOptions=[
    {name:this.translate.instant('shared.allStatus.NewRegistered'), value: RegistraterRequestStatus.NewRegistered},
    {name:this.translate.instant('shared.allStatus.Withdrawal'), value: RegistraterRequestStatus.Withdrawal},
    {name:this.translate.instant('shared.allStatus.TransferInTheEmirategovernmental'), value: RegistraterRequestStatus.TransferInTheEmirategovernmental},
    {name:this.translate.instant('shared.allStatus.TransferInTheEmirateprivate'), value: RegistraterRequestStatus.TransferInTheEmirateprivate},
    {name:this.translate.instant('shared.allStatus.TransferOutsideTheEmirategovernmental'), value: RegistraterRequestStatus.TransferOutsideTheEmirategovernmental},
    {name:this.translate.instant('shared.allStatus.TransferOutsideTheEmirateprivate'), value: RegistraterRequestStatus.TransferOutsideTheEmirateprivate},
    {name:this.translate.instant('shared.allStatus.TransferOutOfTheCountry'), value: RegistraterRequestStatus.TransferOutOfTheCountry},

  ]

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


  submitted

  requiredFiles:Partial<RequestRule>
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
    // this.getStudentInfo()

    this.getReturnedRequest(this.instanceId)
    this.getRequestOptions(this.instanceId)
    // this.getRegistrationRequiresFiles()

  }


  getRequestOptions(instanceId){
    this.requestsService.getRequestOptions(instanceId).subscribe(res=>{
      this.actions = res?.options
    })
  }

  getReturnedRequest(id){
    this.requestsService.getRequestDetails(id).subscribe(res =>{
      this.childData = res?.result?.student
      this.constractFormModel(res.result)
      this.getRegistrationRequiresFiles(res?.result?.grade?.id)
    })
  }

  constractFormModel(formValue){

    this.registerReqForm = this.fb.group({
      id:[formValue?.requestNumber], //request id
      childId:[formValue?.student?.status !=StudentStatus.Withdrawal ? formValue.student?.id :null],
      studentId:[formValue?.student?.status ==StudentStatus.Withdrawal ? formValue?.student?.id : null],
      guardianId:[formValue?.guardian?.id],
      schoolId:[formValue?.school?.id,Validators.required],
      gradeId: [formValue?.grade?.id ,Validators.required],
      studentStatus:[formValue?.student?.status || StudentStatus.Unregistered ],
      isChildOfAMartyr:[ formValue?.isChildOfAMartyr?? null,  this.isRequired() ? Validators.required :[]],
      isSpecialAbilities:[formValue?.isSpecialAbilities ?? null, this.isRequired() ? Validators.required :[]],
      isSpecialClass:[formValue?.isSpecialClass ?? null],
      isInFusionClass:formValue?.isInFusionClass ?? [null],
      specialEducationId:[formValue?.specialEducation?.id ?? null],
      attachments:[[]],
      registrationStatus:[null, Validators.required]
    })

    if(formValue?.isSpecialAbilities) {
      formValue.isInFusionClass ? this.classType='FusionClass':this.classType='SpecialClass'
    }

    this.attachments = formValue?.requestAttachments?.map(el => {
      Object.defineProperty(el, 'title',
      Object.getOwnPropertyDescriptor(el, 'titel'));
        delete el['titel'];
        return el
    })


  }


  isRequired(){
    return !(this.childData?.status ==StudentStatus.Withdrawal || this.scope ==this.ScopeEnum.SPEA)
  }


  getStudentInfo(){
    if(this.childRegistrationStatus==StudentStatus.Withdrawal){
      this.studentService.getStudent(this.route.snapshot.params['childId'])
      .subscribe(res=>{
        this.childData = res.result
        // this.getGrades()
        // this.initRegisterationForm(res?.result)
      })

    }else{
      this._parent.getChild(this.route.snapshot.params['childId'])
      .subscribe(res=>{
        this.childData = res
        // this.getGrades()
        // this.initRegisterationForm(res)
      })
    }
  }



  // initValidation(){
  //   let ctrs = ['isChildOfAMartyr','isSpecialAbilities']
  //   ctrs.forEach(el => {
  //     if(this.childRegistrationStatus==RegistrationStatus.Withdrawal || this.scope ==this.ScopeEnum.SPEA) {
  //       let ctr = this.registerReqForm.controls[el] as FormControl
  //       ctr.removeValidators(Validators.required)
  //       ctr.updateValueAndValidity()
  //     }

  //   })

  // }


  getRegistrationRequiresFiles(gradeId){

    this.settingServcice.getRegisterRequestRequiredAttach(gradeId).subscribe(res=>{
      this.requiredFiles = res.result || {filesCount: 0, isRequired: false, files:[]}
      this.requiredFiles.files = this.requiredFiles.files.map(el =>({...el, uploadedFiles:[]}))
      if(this.attachments) this.setUploadedFiles(this.attachments)
    },err=>{
      this.requiredFiles = {filesCount: 0, isRequired: false, files:[]}
    })
  }



  // patchReturnedRequestData(reqData){
  //   if(reqData?.isSpecialAbilities) {
  //     reqData.isInFusionClass ? this.classType='FusionClass':this.classType='SpecialClass'
  //   }

  //   // this.onGradeSelected(reqData.grade?.id)
  //   this.getRegistrationRequiresFiles(reqData.grade?.id)

  //   this.registerReqForm.controls['gradeId'].setValue(reqData.grade?.id)
  //   // this.onSelectSchool(reqData.school?.id)
  //   this.registerReqForm.controls['schoolId'].setValue(reqData.school?.id)
  //   this.attachments = reqData?.attachments || []
  //   // this.setUploadedFiles()
  //   this.registerReqForm.patchValue(reqData)

  // }


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




  // getGrades(curriculumsId=''){
  //   this.sharedService.getAllGrades('', curriculumsId).subscribe(res=> {
  //   this.AllGrades=res || []

  //   if(!this.registerReqForm) this.initRegisterationForm(this.childData)

  //     if(this.instanceId) {
  //       this.patchReturnedRequestData(this.returnedReqData)
  //       this.getRequestOptions()
  //     }
  //   })
  // }

  attachments :StudentAttachments[] = []
  isAllAttachmentsUploaded =false
  get uploadedFiles(){ return [].concat(...this.requiredFiles.files.map((el:FileRule) => el.uploadedFiles.map((item:[]) => ({...item, ruleFileId: el.ruleFileId}) )))}


  onFileUpload(files, fileTitle, index){
    this.requiredFiles.files[index].uploadedFiles = files.length ? files.map(el=>({...el, title:fileTitle})) : files

    this.attachments= this.uploadedFiles
       //run validation
    this.isAllAttachmentsUploaded = this.isRequiredAttchmentsUploaded()
    // if(uploadedFiles.length) this.attachments[index]= {Titel:file.name, ...uploadedFiles[0]}
   }

   setUploadedFiles(attachments){
    this.attachments = attachments || []

    this.attachments.forEach((file:any , i) =>{
      let index = this.requiredFiles?.files.findIndex(el => el.ruleFileId == file.ruleFileId)

      this.requiredFiles?.files[index]?.uploadedFiles.push(this.attachments[i])
    })
    this.requiredFiles.files =[...this.requiredFiles?.files]

    //run validation
    this.isAllAttachmentsUploaded = this.isRequiredAttchmentsUploaded()

   }


   onFileDelete(files, fileIndex, uploaderIndex){
    this.requiredFiles.files[uploaderIndex].uploadedFiles.splice(fileIndex,1)
    this.attachments= this.uploadedFiles

   }




   onSubmit=false


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
      this.router.navigate(['/requests-list/details', this.instanceId])
    },err=>{
      this.toaster.error(this.translate.instant('toasterMessage.error'))
      this.onSubmit=false
        // this.router.navigate(['/'])
    })
  }







  isRequiredAttchmentsUploaded(){
    return this.requiredFiles?.files.filter(el => el.isMandatory).every(el=> el?.uploadedFiles?.length > 0)
  }


  prepareHeaderData(){
    if(this.currentUserScope== this.ScopeEnum.Guardian){
      this.componentHeaderData = {
        breadCrump: [
          { label: this.translate.instant('parents.sendRegisterReq') ,routerLink:`/parent/child/${this.childId}/register-request`,},
        ],
        mainTitle: { main: this.translate.instant('parents.sendRegisterReq') }
      }

    }else{

      this.componentHeaderData={
        breadCrump: [
          { label: this.translate.instant('parents.parents') ,routerLink:'//schools-and-students/all-parents/',routerLinkActiveOptions:{exact: true}},
          { label: this.translate.instant('parents.childrenList') ,routerLink:`//schools-and-students/all-parents/parent/${this.parentId}/all-children`,routerLinkActiveOptions:{exact: true}},
          {label: this.translate.instant('students.registerChildByCommission'), routerLink: `//schools-and-students/all-parents/parent/${this.parentId}/child/${this.childId}/register`}
        ],
        mainTitle: {
          main: this.translate.instant('students.registerChildByCommission')
        }
      }
    };

    this.headerService.changeHeaderdata(this.componentHeaderData)
  }

}
