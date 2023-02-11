import { Component, Input, OnInit,inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, filter, forkJoin, of, retry, switchMap, tap } from 'rxjs';
import { IHeader } from 'src/app/core/Models';
import { UserRequest, WorkflowOptions } from 'src/app/core/models/system-requests/requests.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { CustomFile } from 'src/app/shared/components/file-upload/file-upload.component';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { RegistrationStatus, StatusEnum, UserRequestsStatus } from 'src/app/shared/enums/status/status.enum';
import { requestTypeEnum } from 'src/app/shared/enums/system-requests/requests.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { IndexesService } from '../../../indexes/service/indexes.service';
import { SystemRequestService } from '../../services/system-request.service';
// import { IunregisterChild } from '../../models/IunregisterChild';


@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['./requestdetails.component.scss']
})
export class RequestdetailsComponent implements OnInit {
  currentUserScope = inject(UserService).getCurrentUserScope()
  lang = inject(TranslationService).lang
  get userScopeEnum(){return UserScope}
  get RequestStatusEnum(){return UserRequestsStatus}
  get requestTypeEnum(){return requestTypeEnum}
  get certificateEnum() { return CertificatesEnum}
  get statusEnum(){return StatusEnum}
  get registartionStatusEnum() { return RegistrationStatus}

  get currentUserSchoolId() { return this. userService.getCurrentSchoollId()}


  isCommentAllowed(){
    let arr=[
      this.RequestStatusEnum.Approved,
      this.RequestStatusEnum.Accepted,
      this.RequestStatusEnum.Canceled,
      this.RequestStatusEnum.Rejected,
    ]
    return !arr.includes(this.requestDetails?.requestStatus)
  }

  requestInstance = this.route.snapshot.paramMap.get('id')
  rejectReasonModel


  reqActionsForm={
    comments:'',
    optionId: null,
    rejectionReasonId: null,  // فى حاله سبب الرفض يكون من فهارس النظام
    rejectionReason:'', // فى حاله سبب الرفض يكون text
    attachments:[]
  }

  step=1
  componentHeaderData: IHeader={ 
		breadCrump: [
			{label: this.translate.instant('dashboard.myRequest.My requests'),routerLink:'/dashboard/performance-managment/RequestList',routerLinkActiveOptions:{exact: true} },
      // {label: this.translate.instant('dashboard.myRequest.School enrollment application'),routerLink:'/dashboard/performance-managment/RequestList/Requestdetails',routerLinkActiveOptions:{exact: true}}
		],
	}

  onSubmited
  filesToUpload:CustomFile[] =[]

  requestDetails:UserRequest

  states
  timeline


  rejectReason$

  getApprovedTask(tasks:any[]){
    
    if(!tasks) return []
    let ApprovedTaskIndex =tasks.findIndex(task => task.status.code ==StatusEnum.Completed)
    // console.log(tasks,ApprovedTaskIndex, tasks.slice(ApprovedTaskIndex,1));
    
    return ApprovedTaskIndex!= -1 ? tasks.slice(ApprovedTaskIndex,1) : tasks.slice(0,1)
  }

  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private router:Router,
    private requestsService:SystemRequestService,
    private toaster:ToastrService,
    private indexesService:IndexesService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    // this.states=[...this.timeline.states].reverse()
    this.checkDashboardHeader();
    this.headerService.changeHeaderdata(this.componentHeaderData)

    this.getRequestDetails()
    this.getRequestTimeline()
  }


  getRequestDetails(){
     this.requestsService.getRequestDetails(this.requestInstance).subscribe(res=>{
      this.requestDetails =res.result
     })
  }

  getRequestTimeline(){
    this.requestsService.getRequestTimline(this.requestInstance).subscribe(res=>{
      this.states = [...res.states?.reverse() ]

      this.states.forEach(state => {
        if(state.status ==StatusEnum.Completed){
          let ApprovedTaskIndex =state?.tasks?.findIndex(task => task.status.code ==StatusEnum.Completed)
          state.tasks= state?.tasks.slice(ApprovedTaskIndex,ApprovedTaskIndex+1)
        }
      });
      console.log(this.states);
      

      if(res.task) res.task.options = res?.task?.options?.map(el=>({...el,isLoading:false}))

      this.timeline=res
      // this.timeline.task.options.map(el=> el.id)
    })
 
  }

  addComment(){
    if(!this.requestDetails.requestComments.length) this.addFirstComment(this.requestDetails.commonRequestId)
    else this.replayToComment(this.requestDetails.requestComments[0].id)
  }

  addFirstComment(commonRequestId){
    let comment={
      commonRequestId: commonRequestId,
      comment: this.reqActionsForm.comments,
      attachments: this.filesToUpload
    }    
    
    this.requestsService.AddFirstRequestComment(comment).subscribe(res=>{
      this.reqActionsForm.comments=''
      this.filesToUpload =[]
      this.getRequestDetails()
      this.toaster.success(this.translate.instant('toasterMessage.messageSend'))
    },()=>{
       this.toaster.error(this.translate.instant('toasterMessage.sendingFailed'))
    })
  }

  replayToComment(commentId){
    let comment={
      commentId: commentId,
      reply: this.reqActionsForm.comments,
      attachments: this.filesToUpload
    }    

    this.requestsService.replayToRequestComment(comment).subscribe(res=>{
      this.reqActionsForm.comments=''
      this.filesToUpload =[]
      this.getRequestDetails()
      this.toaster.success(this.translate.instant('toasterMessage.messageSend'))
    },()=>{
       this.toaster.error(this.translate.instant('toasterMessage.sendingFailed'))
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
    
    if(submittedOption.label?.en.includes('reject')){
      if(this.requestsTypes[this.requestDetails?.requestType]){
        this.rejectReason$ = this.indexesService.getIndext(this.requestsTypes[this.requestDetails?.requestType].rejectReasonType )
      }
      this.rejectReasonModel = true

      return;
    }
    
    this.completeRequestAction()
    submittedOption.isLoading=true
    // this.timeline.task.options[index].isLoading = true
  }
  

  completeRequestAction(){
    this.isLoading=true

    let action={
      ...this.reqActionsForm,
      optionId: this.submittedOption.id,
      attachments:this.filesToUpload.map(file=> ({title: file.name, absolutePath: file.url.replace('https://valsquad.blob.core.windows.net', '') }))
    };

    this.requestsService.changeRequestState(action)
    .subscribe(res=>{

      this.rejectReasonModel = false
      this.getRequestDetails()
      this.getRequestTimeline()

      this.reqActionsForm.comments=''
      this.filesToUpload =[]

      this.isLoading=false
      this.submittedOption.isLoading=false
      this.toaster.success(this.translate.instant('toasterMessage.requestStatusUpdated'))

    },(err)=>{
      this.isLoading=false
      this.rejectReasonModel = false
      this.submittedOption.isLoading=false

      if(err.message && err.message.includes('This student has financial obligations') )this.toaster.error(this.translate.instant('toasterMessage.This student has financial obligations'))
      else this.toaster.error(this.translate.instant('toasterMessage.error'))
      
    })
  }





  isRequestRelatedToStudent(requestType:requestTypeEnum){
    const requests = [
      'StudentRegradingRequest',
      'DeleteStudentRequest',
      'RegestrationRequestForWithrawan',
      "RegestrationApplicationRequest",
      'ModifyIdentityRequest',
      'BoardCertificateRequest',
      'GradesCertificateRequest',
      'AcademicSequenceCertificateRequest',
      'ModifyIdentityRequestCaseStudentNotHaveId',
      'RegestrationRequestForWithrawan',
      'WithdrawalRequest',
      'RelinkChildToGuardianRequestToScool',
      'RelinkChildToGuardianRequestToSPEA'
   ]
    return requests.includes(requestType)
  }




  reSendRegistrationReq(){
    // routerLink="{{'parent/child/'+child.id+'/register-request'}}" [queryParams]="{status:'Registered'}"
    let childRegistartionStatus= this.requestDetails.student.status || RegistrationStatus.Unregistered;
    let childId =this.requestDetails.student.id
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
        schoolId: this.requestDetails.school.id,
        gradeId: this.requestDetails.grade.id,
        studentStatus: RegistrationStatus.Unregistered,
        isChildOfAMartyr:this.requestDetails.isChildOfAMartyr,
        isSpecialAbilities:this.requestDetails.isSpecialAbilities,
        isSpecialClass:this.requestDetails?.isSpecialClass,
        isInFusionClass:this.requestDetails?.isInFusionClass,
        isSpecialEducation:this.requestDetails.isSpecialEducation,
        specialEducationId:this.requestDetails?.specialEducation?.id || null,
        attachments: this.requestDetails.requestAttachments,
      }
    }else{
      reqData = {
        childId:null,
        studentId:this.requestDetails.student.id,
        guardianId:this.requestDetails.guardian.id,
        schoolId:this.requestDetails.school.id,
        gradeId: this.requestDetails.grade.id,
        studentStatus: RegistrationStatus.Withdrawal,
        attachments: this.requestDetails.requestAttachments,
      }
    }

    localStorage.setItem('returnedRequest', JSON.stringify(reqData))
  }


  withdrawReq(){
    this.onSubmited=true
    this.requestsService.withdrawReq(this.requestDetails.requestNumber).subscribe(res=>{
      this.toaster.success(this.translate.instant('toasterMessage.requestWithdrawnSuccesfully'))
      this.router.navigate(['/dashboard/performance-managment/RequestList'])
      this.onSubmited=false

    },()=>{
      this.toaster.error(this.translate.instant('toasterMessage.error'))
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
    this.router.navigate(['/dashboard/school-management/school',this.currentUserSchoolId,'annual-holidays'],{queryParams:{requestInstance: this.requestDetails.id||this.requestInstance}})

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
      this.router.navigate(['/dashboard/student-management/all-parents/parent',this.requestDetails.guardian.id,'all-children'])
    }
  }




   checkDashboardHeader()
   {
       if(this.currentUserScope==UserScope.Employee)
     {
    
     this.componentHeaderData.breadCrump= [
      {label: this.translate.instant('dashboard.Requests.RequestList'),  routerLink:'/dashboard/performance-managment/RequestList',routerLinkActiveOptions:{exact: true}},
      {label: this.translate.instant('dashboard.myRequest.Order details'),routerLink:`/dashboard/performance-managment/RequestList/details/${this.requestInstance}`},
       ]
    
   
     }
     else if (this.currentUserScope==UserScope.SPEA)
     {
     this.componentHeaderData.breadCrump= [
      {label: this.translate.instant('dashboard.Requests.RequestList'),  routerLink:'/dashboard/performance-managment/RequestList',routerLinkActiveOptions:{exact: true}},
      {label: this.translate.instant('dashboard.myRequest.Order details'),routerLink:`/dashboard/performance-managment/RequestList/details/${this.requestInstance}`},
      // {label: this.translate.instant('dashboard.myRequest.School enrollment application'),routerLink:'/dashboard/performance-managment/RequestList/Requestdetails'}
       ]
     
     }
     
     else if (this.currentUserScope==UserScope.Guardian)
     {
     this.componentHeaderData.breadCrump= [
			{label: this.translate.instant('dashboard.myRequest.My requests'),routerLink:`/dashboard/performance-managment/RequestList`,routerLinkActiveOptions:{exact: true}},
      {label: this.translate.instant('dashboard.myRequest.Order details'), routerLink:`/parent/requests-list/details/${this.requestInstance}`},
      // {label: this.translate.instant('dashboard.myRequest.School enrollment application'),}
       ]
   
     }
     
   }

}
