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

  requestId = this.route.snapshot.paramMap.get('id')
  rejectReasonModel

  imagesResult = []

  // reqActionsForm:FormGroup=this.fb.group({
  //   comments:['',Validators.required],
  //   optionId: null,
  //   requestType: null,
  //   rejectionReasonId: 0
  // })

  reqActionsForm={
    comments:'',
    optionId: null,
    rejectionReasonId: null,  // فى حاله سبب الرفض يكون من فهارس النظام
    rejectionReason:'' // فى حاله سبب الرفض يكون text
  }

  step=1
  componentHeaderData: IHeader={ 
		breadCrump: [
			{label: this.translate.instant('dashboard.myRequest.My requests'),routerLink:'/dashboard/performance-managment/RequestList',routerLinkActiveOptions:{exact: true} },
      // {label: this.translate.instant('dashboard.myRequest.School enrollment application'),routerLink:'/dashboard/performance-managment/RequestList/Requestdetails',routerLinkActiveOptions:{exact: true}}
		],
	}

  onSubmited

  requestDetails:UserRequest

  states
  timeline

  // timeline=
  // {
  //   "task": {
  //     "id": 179,
  //     "status": {
  //       "id": 1,
  //       "code": "Pending",
  //       "title": {
  //         "en": "Pending",
  //         "ar": "قيد الانتظار"
  //       }
  //     },
  //     "hasReviewOption": false,
  //     "action": null,
  //     "options": [
  //       {
  //         "id": 347,
  //         "title": {
  //           "en": "approve",
  //           "ar": "approve"
  //         },
  //         "label": {
  //           "en": "approve",
  //           "ar": "approve"
  //         },
  //         "isCommentRequired": false,
  //         "commentTitle": null,
  //         "isAttachmentRequired": false,
  //         "type": "Transition",
  //         "isActionVisibleExternally": false,
  //         "buttonTag": "primary"
  //       }
  //     ],
  //     "createdDate": "2023-01-09T15:01:40.9046266+02:00",
  //     "updatedDate": null
  //   },
  //   "states": [
  //     {
  //       "id": 145,
  //       "status": "Completed",
  //       "state": {
  //         "id": 21,
  //         "code": "Pending for School Employee review",
  //         "title": {
  //           "en": "Pending for School Employee review",
  //           "ar": "في انتظار مراجعة موظف المدرسة"
  //         },
  //         "mappedStatusCode": "Pending",
  //         "isFinal": false
  //       },
  //       "tasks": [
  //         {
  //           "id": 178,
  //           "status": {
  //             "id": 2,
  //             "code": "Completed",
  //             "title": {
  //               "en": "Completed",
  //               "ar": "مكتمل"
  //             }
  //           },
  //           "assignedTo": {
  //             "id": 29,
  //             "email": "mariaammohaamed68@gmail.com",
  //             "fullName": "mariam",
  //             "userPicture": null,
  //             "roles": [
  //               "SharqaEmployee",
  //               "SchoolEmployee"
  //             ]
  //           },
  //           "action": {
  //             "title": {
  //               "en": "TentativelyApprove",
  //               "ar": "موافقة مبدأية"
  //             },
  //             "label": {
  //               "en": "TentativelyApprove",
  //               "ar": "موافقة مبدأية"
  //             },
  //             "comments": "string",
  //             "tag": "primary",
  //             "createdDate": "2023-01-09T14:58:32.5784496+02:00",
  //             "attachments": [
  //               {name:{en:'',ar:'pdf.1 ملف خلاصة القيد'}, url:'www.google.com'},
  //               {name:{en:'',ar:'pdf.2 ملف خلاصة القيد'}, url:'www.google.com'}
  //             ]
  //           },
  //           "createdDate": "2023-01-09T14:56:31.9905678+02:00",
  //           "updatedDate": "2023-01-09T14:58:33.4135068+02:00"
  //         }
  //       ],
  //       "reviewHistory": [],
  //       "createdDate": "2023-01-09T14:56:14.053265+02:00"
  //     },

  //     {
  //       "id": 146,
  //       "status": "Pending",
  //       "state": {
  //         "id": 22,
  //         "code": "TentativelyApprove Regrading Request",
  //         "title": {
  //           "en": "TentativelyApprove",
  //           "ar": "موافقه موظف الهيئه"
  //         },
  //         "mappedStatusCode": "TentativelyAccepted",
  //         "isFinal": false
  //       },
  //       "tasks": [
  //         {
  //           "id": 179,
  //           "status": {
  //             "id": 1,
  //             "code": "Pending",
  //             "title": {
  //               "en": "Pending",
  //               "ar": "قيد الانتظار"
  //             }
  //           },
  //           "assignedTo": {
  //             "id": 29,
  //             "email": "mariaammohaamed68@gmail.com",
  //             "fullName": "mariam",
  //             "userPicture": null,
  //             "roles": [
  //               "SharqaEmployee",
  //               "SchoolEmployee"
  //             ]
  //           },
  //           "action": null,
  //           "createdDate": "2023-01-09T15:01:40.9046266+02:00",
  //           "updatedDate": null
  //         },
  //         {
  //           "id": 180,
  //           "status": {
  //             "id": 1,
  //             "code": "Pending",
  //             "title": {
  //               "en": "Pending",
  //               "ar": "قيد الانتظار"
  //             }
  //           },
  //           "assignedTo": {
  //             "id": 40,
  //             "email": "shchoolemployee@spea.com",
  //             "fullName": "shchool employee",
  //             "userPicture": null,
  //             "roles": [
  //               "SchoolEmployee",
  //               "SchoolaEmployee"
  //             ]
  //           },
  //           "action": null,
  //           "createdDate": "2023-01-09T15:01:40.9070897+02:00",
  //           "updatedDate": null
  //         }
  //       ],
  //       "reviewHistory": [],
  //       "createdDate": "2023-01-09T14:58:33.8816672+02:00"
  //     },
  //     // {
  //     //   "id": 0,
  //     //   "status": "Upcoming",
  //     //   "state": {
  //     //     "id": 25,
  //     //     "code": "Accepted Regrading Request",
  //     //     "title": {
  //     //       "en": "Approve",
  //     //       "ar": "موافقة طلب اعادة مرحلة دراسية"
  //     //     },
  //     //     "mappedStatusCode": "Approve",
  //     //     "isFinal": true
  //     //   },
  //     //   "tasks": null,
  //     //   "reviewHistory": null,
  //     //   "createdDate": null
  //     // }
  //   ],
  //   "id": 139,
  //   "processId": 12,
  //   "currentState": {
  //     "id": 22,
  //     "code": "TentativelyApprove Regrading Request",
  //     "title": {
  //       "en": "TentativelyApprove",
  //       "ar": "موافقة مبدأية لطلب اعادة مرحلة دراسية"
  //     },
  //     "mappedStatusCode": "TentativelyAccepted",
  //     "isFinal": false
  //   },
  //   "createdDate": "2023-01-09T14:56:14.0532138+02:00",
  //   "updatedDate": "2023-01-09T14:58:33.4133086+02:00"
  // }
  
  obj={
    schoolFrom:{name:{ar:'الشارقه الاهليه'}},
    schoolTo:{name:{ar:'الشارقه الاهليه'}},
    gradeTo:{name:{ar:'الصف الرابع'}},
    divisionTo:{name:{ar:'الثانيه'}},
    studentNumber:5
  }

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
     this.requestsService.getRequestDetails(this.requestId).subscribe(res=>{
      this.requestDetails =res.result
     })
  }

  getRequestTimeline(){
    this.requestsService.getRequestTimline(this.requestId).subscribe(res=>{
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
    console.log(submittedOption);
    
    if(submittedOption.label.en=='reject'){
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
    };


    this.requestsService.changeRequestState(action)
    .subscribe(res=>{

      this.rejectReasonModel = false
      this.getRequestDetails()
      this.getRequestTimeline()
      this.toaster.success(this.translate.instant('toasterMessage.requestStatusUpdated'))
      this.isLoading=false
      this.submittedOption.isLoading=false

    },()=>{
      this.isLoading=false
      this.rejectReasonModel = false
      this.submittedOption.isLoading=false
      this.toaster.error(this.translate.instant('toasterMessage.error'))
    })
  }

      // of(154)
      // .pipe(
      //   switchMap((id:any)=>{
          
      //     if(this.filesToUpload.length){
      //       console.log(id);
      //       let arr =[...this.filesToUpload.map((file, index) => this.addAttachmentToAction(file, id, index))]
      //       console.log(arr);
            
      //       return forkJoin([...this.filesToUpload.map((file, index) => this.addAttachmentToAction(file, id, index))] )
      //     }else{
      //       return of(id)
      //     }
      //   }),
      //   tap(console.log)
      //   // filter((res:any) => res !=null)
      //   )


  filesToUpload:CustomFile[] =[]

  addAttachmentToAction(file:CustomFile, actionId, index){

    let fileData={
      title: file.name ,
      path: '',
      data: '',
      url: file.url,
    };
    return this.requestsService.addAttachmentToAction(actionId,fileData).pipe(
      retry(2),
      catchError(err=> {
        // this.uploadedFilesName.splice(index,1)
        this.filesToUpload =  this.filesToUpload.slice(index,1)
        this.toaster.error(`عذرا حدث خطأ فى رفع الملف ${file.name} يرجى المحاوله مره اخرى`)
        return of(null)
    }))
  }

  deleteAttachmentFromAction(files:CustomFile[]){
    this.filesToUpload = files
    // let file={
    //   title: files.length ? files[0].name : '',
    //   path: '',
    //   data: '',
    //   url: files.length ? files[0].url: '',
    //   id: 0 
    // };
    // this.requestsService.deleteAttachmentFromAction(this.submittedOption.id, file)
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
      this.router.navigate(['parent/child',childId,'register-request'],{queryParams:{status:'Withdrawal',requestId: this.requestDetails.requestNumber, instantId:this.requestId}})

    }else if(childRegistartionStatus == RegistrationStatus.Unregistered){
      this.router.navigate(['parent/child',childId,'register-request'],{queryParams:{status:'Unregistered',requestId: this.requestDetails.requestNumber, instantId:this.requestId}})

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
      reason: this.requestDetails.cause,
      userName: ''
    }
    localStorage.setItem('returnedRequest', JSON.stringify(data))
    this.router.navigate(['/dashboard/school-management/school/',this.currentUserSchoolId,'/annual-holidays'],{queryParams:{requestInstance: this.requestDetails.id}})

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
      {label: this.translate.instant('dashboard.myRequest.Order details'),routerLink:`/dashboard/performance-managment/RequestList/details/${this.requestId}`},
       ]
    
   
     }
     else if (this.currentUserScope==UserScope.SPEA)
     {
     this.componentHeaderData.breadCrump= [
      {label: this.translate.instant('dashboard.Requests.RequestList'),  routerLink:'/dashboard/performance-managment/RequestList',routerLinkActiveOptions:{exact: true}},
      {label: this.translate.instant('dashboard.myRequest.Order details'),routerLink:`/dashboard/performance-managment/RequestList/details/${this.requestId}`},
      // {label: this.translate.instant('dashboard.myRequest.School enrollment application'),routerLink:'/dashboard/performance-managment/RequestList/Requestdetails'}
       ]
     
     }
     
     else if (this.currentUserScope==UserScope.Guardian)
     {
     this.componentHeaderData.breadCrump= [
			{label: this.translate.instant('dashboard.myRequest.My requests'),routerLink:`/dashboard/performance-managment/RequestList`,routerLinkActiveOptions:{exact: true}},
      {label: this.translate.instant('dashboard.myRequest.Order details'), routerLink:`/parent/requests-list/details/${this.requestId}`},
      // {label: this.translate.instant('dashboard.myRequest.School enrollment application'),}
       ]
   
     }
     
   }

}
