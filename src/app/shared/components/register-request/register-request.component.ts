import { Name } from './../../../core/Models/Survey/IAddSurvey';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { IHeader } from 'src/app/core/Models';
import { Filter } from 'src/app/core/models/filter/filter';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { IndexesService } from '../../../modules/dashboard/modules/indexes/service/indexes.service';
import { SchoolsService } from '../../../modules/dashboard/modules/schools/services/schools/schools.service';
import { FileEnum } from '../../enums/file/file.enum';
import { UserScope } from '../../enums/user/user.enum';
import { ExportService } from '../../services/export/export.service';
import { ParentService } from 'src/app/modules/dashboard/modules/parants/services/parent.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ToastrService } from 'ngx-toastr';
import { RegistrationStatus, StatusEnum } from '../../enums/status/status.enum';
import { CustomFile } from '../file-upload/file-upload.component';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { SystemRequestService } from 'src/app/modules/dashboard/modules/request-list/services/system-request.service';
import { WorkflowOptions } from 'src/app/core/models/system-requests/requests.model';
import { catchError, map, switchMap, throwError } from 'rxjs';
import { SettingsService } from 'src/app/modules/dashboard/modules/system-setting/services/settings/settings.service';
import { requestTypeEnum } from '../../enums/system-requests/requests.enum';
import { FileRule, RequestRule } from 'src/app/core/models/settings/settings.model';
import { HttpStatusCodeEnum } from '../../enums/http-status-code/http-status-code.enum';
import { StudentsService } from 'src/app/modules/dashboard/modules/students/services/students/students.service';

type ClassType= 'FusionClass' | 'SpecialClass'

@Component({
  selector: 'app-register-request',
  templateUrl: './register-request.component.html',
  styleUrls: ['./register-request.component.scss']
})
export class RegisterRequestComponent implements OnInit {
  childData
  lang = this.translationService.lang
  scope = inject(UserService).getCurrentUserScope()
  get ScopeEnum(){ return UserScope}
  get registrtionStatusEnum () {return RegistrationStatus}
  get currentUserScope (){return this.userService.getCurrentUserScope()}

  parentId = +this.route.snapshot.paramMap.get('parentId')
  childId = +this.route.snapshot.paramMap.get('childId')
  studentId = +this.route.snapshot.paramMap.get('studentId')
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

  filtration :Filter = {...Filtration, curriculumId:'', StateId: '',GradeId:''}
  paginationState= {...paginationInitialState}
  
  
  AllGrades$ =this.sharedService.getAllGrades('')
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
  // =[
  //   {Titel:{ar:"صورة الهوية",en:"Identity Image"}, fileSize:4},
  //   {Titel:{ar:"صورة القيد",en:"Identity Image"}, fileSize:4},
  //   {Titel:{ar:"صورة شهاده الميلاد",en:"Identity Image"}, fileSize:4}
  // ]
  
  
  selectedSchoolId
  selectedGradeId


    // ارسال طلب تسجيل للابن او الطالب المنسحب 
  registerReqForm:FormGroup = this.fb.group({
    id:[],
    childId:[this.childId],
    studentId:[this.childRegistrationStatus==RegistrationStatus.Withdrawal ? this.childId : null],
    guardianId:[this.parentId],
    schoolId:[null,Validators.required],
    gradeId: [null,Validators.required],
    studentStatus:[this.childRegistrationStatus==RegistrationStatus.Withdrawal?RegistrationStatus.Withdrawal : RegistrationStatus.Unregistered ],
    isChildOfAMartyr:[null,Validators.required],
    isSpecialAbilities:[null,Validators.required],
    isSpecialClass:[null],
    isInFusionClass:[null],
    isSpecialEducation:[null,Validators.required],
    specialEducationId:[null],
    attachments:[[]],
  })


  classType:ClassType

  constructor(
    private translate: TranslateService,
    private translationService:TranslationService,
    private headerService: HeaderService,
    private sharedService: SharedService,
    private schoolsService:SchoolsService,
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

    if(this.scope==UserScope.Guardian) {
      this.parentId = this.userService.getCurrentGuardian()?.id
      this.registerReqForm.controls['guardianId'].setValue(this.parentId)
    }
    else  this.getStudentInfo()   
    
    if(this.requestId) {
      this.patchReturnedRequestData(this.returnedReqData)
      this.getRequestOptions()
    }


    this.getRegistrationRequiresFiles()
    
    this.childRegistrationStatus==RegistrationStatus.Withdrawal && this.setSelectedGradeForWithdrawalStudent()

    this.initValidation()
  }

  initValidation(){
    let ctrs = ['isChildOfAMartyr','isSpecialAbilities','isSpecialEducation']
    ctrs.forEach(el => {
      if(this.childRegistrationStatus==RegistrationStatus.Withdrawal || this.scope ==this.ScopeEnum.SPEA) {
        let ctr = this.registerReqForm.controls[el] as FormControl
        ctr.removeValidators(Validators.required)
        ctr.updateValueAndValidity()
      }

    })
    
  }

  currentGrade
  setSelectedGradeForWithdrawalStudent(){
   
    this._parent.getSelectedGradeForWithdrawalStudent(this.childId || this.studentId)
    .pipe(map(res => res.result))
    .subscribe(res=>{
      this.registerReqForm.controls['gradeId'].setValue(res?.id)
      this.onGradeSelected(res?.id)
      this.currentGrade=res
      // this.onGradeSelected(res.id)
    },err =>{
      this.onGradeSelected(2)
      this.registerReqForm.controls['gradeId'].setValue(2)
    })
  }

  getRegistrationRequiresFiles(){
    this.settingServcice.getRequestRquiredFiles(requestTypeEnum.RegestrationApplicationRequest).subscribe(res=>{
      this.requiredFiles = res.result || {filesCount: 0, isRequired: false, files:[]}
    })
  }

  getRequestOptions(){
    this.requestsService.getRequestTimline(this.reqInstantId).subscribe(res=>{
      this.actions = res?.task?.options
    })
  }

  patchReturnedRequestData(reqData){
    reqData.isInFusionClass ? this.classType='FusionClass':this.classType='SpecialClass'
    this.onGradeSelected(reqData.gradeId)
    this.onSelectSchool(reqData.schoolId)
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
  
  getStudentInfo(){
    if(this.childRegistrationStatus==RegistrationStatus.Withdrawal){
      this.studentService.getStudent(this.route.snapshot.params['childId']).subscribe(res=>{
        this.childData = res.result
      })
      
    }else{
      this._parent.getChild(this.route.snapshot.params['childId']).subscribe(res=>{
        this.childData = res
      })
    }
  }



    
  onGradeSelected(gardeId){
 
    this.selectedGradeId=gardeId

    this.selectedSchoolId =null
    
    this.filtration.GradeId = gardeId
    this.getSchools()
    // this.registerReqForm.controls['gradeId'].setValue(gardeId)
    // this.gradeDivisions$ =  this.gradeService.getGradeDivision(this.selectedSchool.value.id, gardeId).pipe(map(val=>val.data))
  }

  
  getSchools(){
    this.schools.loading=true
    this.schools.list=[]
  
    this.schoolsService.getAllSchools(this.filtration)
    .subscribe(res =>{
      this.schools.loading = false
      this.schools.list = res.data
      this.schools.totalAllData = res.totalAllData
      this.schools.total =res.total
  
    },err=> {
      this.schools.loading=false
      this.schools.total=0
    })
  }


  onSelectSchool(schoolId) {
    this.selectedSchoolId =schoolId
    this.registerReqForm.controls['schoolId'].setValue(schoolId)
  }
  

  attachments :CustomFile[] = []



  onFileUpload(uploadedFiles:CustomFile[],file,index){    
    if(uploadedFiles.length) this.attachments[index]= {Titel:file.name, ...uploadedFiles[0]}
   }
  
   onFileDelete(index){
    this.attachments.splice(index,1)
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
          let mes = this.translate.instant('toasterMessage.Registration Request Already send before to this school')
          throw new Error(mes)
        }else{
          return res
        }
      })
    )
    .subscribe(res=>{
      this.toaster.success(this.translate.instant('toasterMessage.requestSendSuccessfully'))
      this.onSubmit=false
      this.router.navigate(['/parent/requests-list'])

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
      this.router.navigate(['/parent/requests-list/details', this.reqInstantId])
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
      gradeId:this.selectedGradeId,
      schoolId: this.registerReqForm.controls['schoolId'].value
    };

    this._parent.registerChildBySpea(this.childId, data)
    .subscribe(res=>{
      
      this.onSubmit=false
      this.router.navigateByUrl(`/dashboard/schools-and-students/all-parents/parent/${this.parentId}/all-children`)
      this.toaster.success(this.translate.instant('toasterMessage.childRegistedSuccesfully'))
    },(err)=>{
      this.toaster.error(this.translate.instant('toasterMessage.error'))

      this.onSubmit=false
    })


    // let data ={
    //   "attachments":   this.backupData.map(({index,...rest})=> rest),
    // "selectedSchool":this.selectedSchool.value.id,
    // "ChildId": Number(this.route.snapshot.paramMap.get('childId')),
    // "GurdianId": Number(this.route.snapshot.paramMap.get('parentId'))
    // }
    // console.log(data)
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
          { label: this.translate.instant('dashboard.parents.parents') ,routerLink:'/dashboard/schools-and-students/all-parents/',routerLinkActiveOptions:{exact: true}},
          { label: this.translate.instant('dashboard.parents.childrenList') ,routerLink:`/dashboard/schools-and-students/all-parents/parent/${this.parentId}/all-children`,routerLinkActiveOptions:{exact: true}},
          {label: this.translate.instant('dashboard.students.registerChildByCommission'), routerLink: `/dashboard/schools-and-students/all-parents/parent/${this.parentId}/child/${this.childId}/register`}
        ],
        mainTitle: {
          main: this.translate.instant('dashboard.students.registerChildByCommission')
        }
      }
    };

    this.headerService.changeHeaderdata(this.componentHeaderData)
  }


}
