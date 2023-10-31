import { Component, OnInit,ViewChild,inject} from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IHeader } from 'src/app/core/Models';
import { UserRequest, WorkflowOptions } from 'src/app/core/models/system-requests/requests.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { RegistrationStatus, StatusEnum, UserRequestsStatus } from 'src/app/shared/enums/status/status.enum';
import { requestTypeEnum } from 'src/app/shared/enums/system-requests/requests.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { IndexesService } from '../../../indexes/service/indexes.service';
import { SystemRequestService } from '../../services/system-request.service';
import { Observable, delay, map, switchMap } from 'rxjs';
import { Division } from 'src/app/core/models/global/global.model';
import { GradesService } from 'src/app/modules/schools/services/grade/grade.service';
import { IssuanceCertificaeService } from 'src/app/modules/issuance-of-a-certificate-pages/services/issuance-certificae.service';
import { environment } from 'src/environments/environment';
import { RequestStatesComponent } from './request-states/request-states.component';


@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['./requestdetails.component.scss']
})
export class RequestdetailsComponent implements OnInit {
  @ViewChild('requestStatesComp') requestStatesComp:RequestStatesComponent
  currentUserScope = inject(UserService).getScope()
  lang = inject(TranslationService).lang
  get userScopeEnum(){return UserScope}
  get RequestStatusEnum(){return UserRequestsStatus}
  get requestTypeEnum(){return requestTypeEnum}
  get certificateEnum() { return CertificatesEnum}
  get statusEnum(){return StatusEnum}
  get registrationStatusEnum() { return RegistrationStatus}

  get currentUserSchoolId() { return this. userService.getSchoolId()}




  requestInstance = this.route.snapshot.paramMap.get('id')
  rejectReasonModel
  addStudentTodivisionModal


  reqActionsForm={
    comments:'',
    optionId: null,
    rejectionReasonId: null,  // فى حاله سبب الرفض يكون من فهارس النظام
    rejectionReason:'', // فى حاله سبب الرفض يكون text
    attachments:[],
    divisionIdForRegistrationRequest:'' // لطلب التسجيل فقط
  }

  step=1
  componentHeaderData: IHeader={
		breadCrump: [
			{label: this.translate.instant('dashboard.myRequest.My requests'),routerLink:'/performance-managment/RequestList',routerLinkActiveOptions:{exact: true} },
      // {label: this.translate.instant('dashboard.myRequest.School enrollment application'),routerLink:'/performance-managment/RequestList/Requestdetails',routerLinkActiveOptions:{exact: true}}
		],
	}

  onSubmited
  // filesToUpload:CustomFile[] =[]

  requestDetails:UserRequest
  requestOptions


  rejectReason$

  getApprovedTask(tasks:any[]){

    if(!tasks) return []
    let ApprovedTaskIndex =tasks.findIndex(task => task.status.code ==StatusEnum.Completed)
    // console.log(tasks,ApprovedTaskIndex, tasks.slice(ApprovedTaskIndex,1));

    return ApprovedTaskIndex!= -1 ? tasks.slice(ApprovedTaskIndex,1) : tasks.slice(0,1)
  }

  gradeDivisions$ :Observable<Division>


  currentState
  states

  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private router:Router,
    private requestsService:SystemRequestService,
    private toaster:ToastrService,
    private indexesService:IndexesService,
    private userService:UserService,
    private gradeService:GradesService,
    private certificatesService:IssuanceCertificaeService
  ) { }

  ngOnInit(): void {
    // this.states=[...this.timeline.states].reverse()


    this.getRequestDetails()
    this.getRequestOptions()
    this.getRequestStates()
  }


  getRequestDetails(){
    this.requestsService.getRequestDetails(this.requestInstance).subscribe(res=>{
      this.requestDetails =res.result
      this.checkDashboardHeader();

      this.gradeDivisions$ = this.gradeService.getGradeDivision(res?.result?.school?.id, res?.result?.grade?.id).pipe(map((res:any) => res?.data ||[]));
     })
  }

  getRequestStates(){
    this.requestsService.getRequestStates(this.requestInstance)
    .subscribe(res=>{
      this.currentState=res
      this.states = [...res.states?.map(el => ({...el, tasks:el.tasks || []})).reverse() ]
    })
  }


  getRequestOptions(){
    this.requestsService.getRequestOptions(this.requestInstance)
    .pipe(
      switchMap(()=>{
      return this.requestsService.getRequestOptions(this.requestInstance)
    }))
    .subscribe(res=>{
      if(res.options)  this.requestOptions= res?.options?.map(el=>({...el,isLoading:false}))
    })
  }

  // NOTE :- Request Perform action LOgic

  submittedOption
  isActionLoading=[false,false,false]
  isLoading=false

  /** requests that need reject reason from Indexes'فهارس النظام' */
  requestsTypes={
    StudentRegradingRequest : {rejectReasonType:IndexesEnum.TheReasonForRejectRegradingRequest},
    DeleteStudentRequest : {rejectReasonType:IndexesEnum.ReasonsForRefusingToRemoveAStudentFromASchool},
    RegestrationApplicationRequest : {rejectReasonType: IndexesEnum.TheMainReasonsForRejectionOfTheApplicationForRegistration},
    RegestrationRequestForWithrawan : {rejectReasonType: IndexesEnum.TheMainReasonsForRejectionOfTheApplicationForRegistration},
    WithdrawalRequest : {rejectReasonType: IndexesEnum.TheReasonForRejectingTheWithdrawalRequest},
  }



  onActionTaken(submittedOption: WorkflowOptions, index){
    this.submittedOption = submittedOption
    // this.currentState?.currentState?.isFinal &&
    let isRegistrationReqLastStep =(this.requestDetails?.requestType== this.requestTypeEnum.RegestrationApplicationRequest || this.requestDetails?.requestType== this.requestTypeEnum.RegestrationRequestForWithrawan) && this.requestDetails?.requestStatus==this.RequestStatusEnum.Approved

    if(submittedOption.label?.en.includes('reject') || submittedOption.label?.en.includes('Reject')){
      if(this.requestsTypes[this.requestDetails?.requestType]){
        this.rejectReason$ = this.indexesService.getIndext(this.requestsTypes[this.requestDetails?.requestType].rejectReasonType )
      }
      this.rejectReasonModel = true

      return;
    }else if(isRegistrationReqLastStep){
      this.addStudentTodivisionModal = true
      return

    }

    this.completeRequestAction()
    submittedOption.isLoading=true

  }


  completeRequestAction(){
    this.isLoading=true

    let action={
      ...this.reqActionsForm,
      optionId: this.submittedOption.id,
      // attachments:this.filesToUpload.map(file=> ({title: file.name, absolutePath: file.url.replace('https://valsquad.blob.core.windows.net', '') }))
    };

    this.requestsService.changeRequestState(action)
    .subscribe(res=>{

      this.rejectReasonModel = false
      this.addStudentTodivisionModal = false
      this.getRequestDetails()
      this.getRequestOptions()
      this.requestStatesComp.getRequestStates()

      this.reqActionsForm.comments=''
      // this.filesToUpload =[]

      this.isLoading=false
      this.submittedOption.isLoading=false
      this.toaster.success(this.translate.instant('toasterMessage.requestStatusUpdated'))

    },(err)=>{
      this.isLoading=false
      this.rejectReasonModel = false
      this.submittedOption.isLoading=false
      this.addStudentTodivisionModal = false
      console.log(err);
      console.log(err.message);

      if(err.message && err.message.includes('This student has financial obligations') )this.toaster.error(this.translate.instant('toasterMessage.This student has financial obligations'))
      else if(err.message && err.message.includes('Request status is Cancelled'))  this.toaster.error(this.translate.instant('toasterMessage.Request status is Cancelled'))
      else if(err.message && err.message.includes('The number of students is complete in this division'))  this.toaster.error(this.translate.instant('toasterMessage.The number of students is complete in this division'))
      else if(err.message && err.message.includes('This task is already performed'))  this.toaster.error(this.translate.instant('This task is already performed'))
      else if(err.message && err.message?.En?.includes('This task is already performed') || err?.En?.includes('This task is already performed'))  this.toaster.error(this.translate.instant('toasterMessage.This task is already performed'))
      else this.toaster.error(this.translate.instant('toasterMessage.error'))

    })
  }


isRequestAllowedForWithdrawal(requestType:requestTypeEnum){
  let reqs = [
    'FlexibleHolidayRequest',
    'WithdrawalRequest',
    'StudentRegradingRequest',
    'RegestrationApplicationRequest',
    'ModifyIdentityRequest',
    'ModifyIdentityRequestCaseStudentNotHaveId',
    'AcademicSequenceCertificateRequest',
    'BoardCertificateRequest',
    'GradesCertificateRequest',
    'ExemptionFromSubjectRequest'
  ]
  return reqs.includes(requestType)
}


  isRequestRelatedToStudent(requestType:requestTypeEnum){
    const requests = [
      'StudentRegradingRequest',
      'DeleteStudentRequest',
      "RegestrationApplicationRequest",
      'ModifyIdentityRequest',
      'BoardCertificateRequest',
      'GradesCertificateRequest',
      'AcademicSequenceCertificateRequest',
      'ModifyIdentityRequestCaseStudentNotHaveId',
      'RegestrationRequestForWithrawan',
      'WithdrawalRequest',
      'RelinkChildToGuardianRequestToScool',
      'RelinkChildToGuardianRequestToSPEA',
      'ExemptionFromSubjectRequest'
   ]
    return requests.includes(requestType)
  }

  isRequestRelatedToSchool(requestType){
    let arr = ['ModifyIdentityRequestCaseStudentNotHaveId','ModifyIdentityRequest','FlexibleHolidayRequest', 'DeleteStudentRequest','MassTransferRequest','StudentRegradingRequestForSchool']
    return arr.includes(requestType)
  }




  reSendRegistrationReq(){
    // routerLink="{{'parent/child/'+child.id+'/register-request'}}" [queryParams]="{status:'Registered'}"
    let childRegistartionStatus= this.requestDetails?.student?.status || RegistrationStatus.Unregistered;
    let childId = childRegistartionStatus == RegistrationStatus.Withdrawal ? this.requestDetails?.student?.studentGuid : this.requestDetails?.student?.id
    this.saveReqData()

    if(childRegistartionStatus == RegistrationStatus.Withdrawal){
      this.router.navigate(['parent/child',childId,'register-request'],{queryParams:{status:'Withdrawal',requestId: this.requestDetails.requestNumber, instantId:this.requestInstance}})

    }else if(childRegistartionStatus == RegistrationStatus.Unregistered){
      this.router.navigate(['parent/child',childId,'register-request'],{queryParams:{status:'Unregistered',requestId: this.requestDetails.requestNumber, instantId:this.requestInstance}})

    }
  }


  saveReqData(){
    let reqData

    if(!(this.requestDetails.student.status ==RegistrationStatus.Withdrawal)){

      reqData = {
        id: this.requestDetails.requestNumber,
        childId:this.requestDetails.childId,
        studentId:null,
        guardianId:this.requestDetails.guardian.id,
        school: this.requestDetails.school,
        grade: this.requestDetails.grade,
        studentStatus: RegistrationStatus.Unregistered,
        isChildOfAMartyr:this.requestDetails.isChildOfAMartyr,
        isSpecialAbilities:this.requestDetails.isSpecialAbilities,
        isSpecialClass:this.requestDetails?.isSpecialClass,
        isInFusionClass:this.requestDetails?.isInFusionClass,
        // isSpecialEducation:this.requestDetails.isSpecialEducation,
        specialEducationId:this.requestDetails?.specialEducation?.id || null,
        attachments: this.requestDetails.requestAttachments.map(el => {
          Object.defineProperty(el, 'title',
          Object.getOwnPropertyDescriptor(el, 'titel'));
            delete el['titel'];
            return el
        }),
      }

    }else{
      reqData = {
        childId:null,
        id: this.requestDetails.requestNumber,
        studentId:this.requestDetails.student.id,
        guardianId:this.requestDetails.guardian.id,
        school:this.requestDetails.school,
        grade: this.requestDetails.grade,
        studentStatus: RegistrationStatus.Withdrawal,
        attachments: this.requestDetails.requestAttachments,
      }
    }

    localStorage.setItem('returnedRequest', JSON.stringify(reqData))
  }


  withdrawReq(reqType: requestTypeEnum){
    this.onSubmited=true
    this.requestsService.withdrawReq(this.requestInstance,reqType).subscribe(res=>{
      this.toaster.success(this.translate.instant('toasterMessage.requestWithdrawnSuccesfully'))
      this.router.navigate(['/performance-managment/RequestList'])
      this.onSubmited=false

    },(err:Error)=>{
      this.toaster.error(err?.message || this.translate.instant('toasterMessage.error'))
      this.onSubmited=false

    })
  }


  reOpenRequest(){
    let reqBody={
      instanceId: this.requestInstance,
      stateId: 0,
      comments: ""
    }
    this.onSubmited=true
    this.requestsService.reOpenRequest(reqBody).pipe(delay(1500)).subscribe(res=>{
      this.getRequestDetails()
      this.getRequestOptions()
      this.toaster.success(this.translate.instant('toasterMessage.requestReopenSuccesfully'))
      this.onSubmited=false

    },(err:Error)=>{
      this.toaster.error(err?.message || this.translate.instant('toasterMessage.error'))
      this.onSubmited=false

    })
  }


  reSendFlexableHolidayReq(){
    let data={
      id: this.requestDetails.requestNumber,
      dateFrom: this.requestDetails.dateFrom,
      dateTo: this.requestDetails.dateTo,
      description: this.requestDetails.reason,
    }
    localStorage.setItem('returnedRequest', JSON.stringify(data))
    this.router.navigate(['/school-management/school',this.currentUserSchoolId,'annual-holidays'],{queryParams:{requestId: this.requestDetails.requestNumber, requestInstance: this.requestInstance}})

  }


  reSendCertificateReq(){

    let data= {
      student:{
        id: this.requestDetails.student?.id,
        name:this.requestDetails.student?.name,
      },
      academicSequence: this.requestDetails.schoolYears.map(el => {
        return {
          schoolYearName: el.schoolYear,
          schoolName: el.schoolName,
          gradeName: el.gradeName,
          attachments:[]
        }
      })
    }

    localStorage.setItem('returnedRequest', JSON.stringify(data))
    this.router.navigate(['/certificates/ask-certificate'],{queryParams:{requestId: this.requestDetails.requestNumber, requestInstance: this.requestInstance}})

  }


  viewUser(){
    let reqTypesrelatedToGurdians=[
      'StudentRegradingRequest',
      'RegestrationRequestForWithrawan',
      "RegestrationApplicationRequest",
      'ModifyIdentityRequest',
      'ModifyIdentityRequestCaseStudentNotHaveId',
      'BoardCertificateRequest',
      'GradesCertificateRequest',
      'AcademicSequenceCertificateRequest',
      'WithdrawalRequest',
      'RelinkChildToGuardianRequestToScool',
      'RelinkChildToGuardianRequestToSPEA'
    ]
    if(reqTypesrelatedToGurdians.includes(this.requestDetails?.requestType ) && this.currentUserScope!=this.userScopeEnum.Guardian){
      if(this.currentUserScope==this.userScopeEnum.Employee)
        this.router.navigate(['/student-management/all-parents/parent',this.requestDetails.guardian.id,'all-children'])
      else
        this.router.navigate(['/schools-and-students/all-parents/parent',this.requestDetails.guardian.id,'all-children'])
    }
  }



  goToChildPage(student){

    let id = this.requestDetails?.student?.status ==RegistrationStatus.Unregistered ?  student?.id : student?.studentGuid
    let guardianId = this.requestDetails?.guardian?.id

    if(this.currentUserScope==this.userScopeEnum.SPEA){
      let url = this.requestDetails?.student?.status ==RegistrationStatus.Unregistered ? `${environment.clientUrl}/schools-and-students/all-parents/parent/${guardianId}/child/${id}` :  `${environment.clientUrl}/schools-and-students/students/student/${id}`;
      window.open(url)

    }else if(this.currentUserScope==this.userScopeEnum.Employee){
      let url = this.requestDetails?.student?.status ==RegistrationStatus.Unregistered ? `${environment.clientUrl}/student-management/all-parents/parent/${guardianId}/child/${id}` : `${environment.clientUrl}/student-management/students/student/${id}`;
      window.open(url)
    } else if(this.currentUserScope==this.userScopeEnum.Guardian){
      let url = this.requestDetails?.student?.status ==RegistrationStatus.Unregistered ? `${environment.clientUrl}/parent/${guardianId}/child/${id}` : `${environment.clientUrl}/parent/${guardianId}/student/${id}`;
      window.open(url)
    }
  }



   checkDashboardHeader()
   {
     if (this.currentUserScope == UserScope.Employee) {
       this.componentHeaderData.breadCrump = [
         {
           label: this.translate.instant('dashboard.Requests.RequestList'),
           routerLink: '/performance-managment/RequestList',
           routerLinkActiveOptions: { exact: true },
         },
         {
           label: this.translate.instant('dashboard.myRequest.Order details'),
           routerLink: `/performance-managment/RequestList/details/${this.requestInstance}`,
         },
       ];

     } else if (this.currentUserScope == UserScope.SPEA) {
       this.componentHeaderData.breadCrump = [
         {
           label: this.translate.instant('dashboard.Requests.RequestList'),
           routerLink: '/performance-managment/RequestList',
           routerLinkActiveOptions: { exact: true },
         },
         {
           label: this.translate.instant('dashboard.myRequest.Order details'),
           routerLink: `/performance-managment/RequestList/details/${this.requestInstance}`,
         },
         // {label: this.translate.instant('dashboard.myRequest.School enrollment application'),routerLink:'/performance-managment/RequestList/Requestdetails'}
       ];
     } else if (this.currentUserScope == UserScope.Guardian) {
       this.componentHeaderData.breadCrump = [
         {
           label: this.translate.instant('dashboard.myRequest.My requests'),
           routerLink: `/requests-list`,
           routerLinkActiveOptions: { exact: true },
         },
         {
           label: this.translate.instant('dashboard.myRequest.Order details'),
           routerLink: `/requests-list/details/${this.requestInstance}`,
         },
         // {label: this.translate.instant('dashboard.myRequest.School enrollment application'),}
       ];
     }

     this.headerService.changeHeaderdata(this.componentHeaderData)
   }

}
