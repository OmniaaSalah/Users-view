import { Component, Input, OnInit,inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IHeader } from 'src/app/core/Models';
import { IunregisterChild } from 'src/app/core/Models/IunregisterChild';
import { WorkflowOptions } from 'src/app/core/models/system-requests/requests.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { CustomFile } from 'src/app/shared/components/file-upload/file-upload.component';
import { CertificatesEnum } from 'src/app/shared/enums/certficates/certificate.enum';
import { DegreesCertificatesEnum } from 'src/app/shared/enums/certficates/degrees-certificates';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { RequestsEnum } from 'src/app/shared/enums/system-requests/requests.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { IndexesService } from '../../../indexes/service/indexes.service';
import { ParentService } from '../../../parants/services/parent.service';
import { SystemRequestService } from '../../services/system-request.service';
// import { IunregisterChild } from '../../models/IunregisterChild';


@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['./requestdetails.component.scss']
})
export class RequestdetailsComponent implements OnInit {
  currentUserScope = inject(UserService).getCurrentUserScope()
  get userScopeEnum(){return UserScope}
  get statusEnum(){return StatusEnum}
  get requetsaEnum(){return RequestsEnum}
  get certificateEnum() { return CertificatesEnum}


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
    requestType: null,
    rejectionReasonId: 0
  }

  step=1
  componentHeaderData: IHeader={ 
		breadCrump: [
			{label: this.translate.instant('dashboard.myRequest.My requests'),routerLink:'/dashboard/performance-managment/RequestList',routerLinkActiveOptions:{exact: true} },
      // {label: this.translate.instant('dashboard.myRequest.School enrollment application'),routerLink:'/dashboard/performance-managment/RequestList/Requestdetails',routerLinkActiveOptions:{exact: true}}
		],
	}


  requestDetails
//   {
//     id:"#123456",
//     requestNumber:5,
//     requestStatus: StatusEnum.Accepted,
//     createdBy: {
//         en: 'george123',
//         ar: 'حور3'
//     },
//     guardian: {
//       id: 66,
//       name: {
//           "en": "george123",
//           "ar": "حورح3"
//       }
//     },
//     createdDate: "2023-01-13T19:54:27.4480972+00:00",
//     cause: "السبب التاني",
//     requestAttachments: [ 
//       {name:{en:'',ar:'pdf.1 ملف خلاصة القيد'}, url:'www.google.com'},
//       {name:{en:'',ar:'pdf.2 ملف خلاصة القيد'}, url:'www.google.com'}
//      ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ,
//     requestType: RequestsEnum.RelinkChildToGuardianRequestToScool,


//       certificateType:CertificatesEnum.BoardCertificate,

//       SchoolYears:[
//         {SchoolYear :{ar:'2020/ 2023'},schoolName:{ar:'مدرسه الشارقه'}, gradeName:{ar:"الصف الرابع"}},
//         {SchoolYear :{ar:'2020/ 2023'},schoolName:{ar:'مدرسه الشارقه'}, gradeName:{ar:"الصف الرابع"}},
//         {SchoolYear :{ar:'2020/ 2023'},schoolName:{ar:'مدرسه الشارقه'}, gradeName:{ar:"الصف الرابع"}}
//       ],

  
//       SchoolYear :{ar:'2020/ 2023'},
//       gradeCertificateType : DegreesCertificatesEnum.MinisterialSubjects,
   

//       // تعديل اجاذه مرنه
//        dateFrom:'2002/07/04',
//        dateTo:'2002/07/09',
//       //  cause:'',

//       //طلب تعديل هويه
//       NewIdentityNumber:'65652352666',
//       // attachments: {name:'', url:''},

//       // طلب انسحاب
//       WithdrawalType:{ar:'سبب الانسحاب'},
//       // cause:'',
//       // attachments: [{name:'', url:''}],

//       // طلب تسجيل
//       isChildOfAMartyr: true,
//       isSpecialAbilities: false,
//       isSpecialClass:true,
//       isInFusionClass:false,
//       specialClass:{id:'', name:{en:'', ar:'فصول خاصه'}},
//       isSpecialEducation: true,
//       specialEducation:{id:'', name:{en:'', ar:'تعليم خاص'}},
//       grade: {id:'', name:{en:'', ar:'الصف الرابع'}},
//       school:{id:'', name:{en:'', ar:'مدرسه الشارقه'}},
//       // attachments: [{name:'', url:''}],

  
//       // تعديل احازه مرنه
//         // long RequestNumber { get; set; }
//         // RequestTypeEnum? RequestType { get; set; }
//         // RequestStatus RequestStatus { get; set; }
//         // LocalizedItemDto CreatedBy { get; set; }
//         // LocalizedItemDto AnnualCalendarName { get; set; }
//         // string SchoolYear { get; set; }
//         // LocalizedItemDto HolidayName { get; set; }
//         // DateTime DateFrom { get; set; }
//         // DateTime DateTo { get; set; }
//         // DateTime CreatedDate { get; set; }

//     // طلب نقل جماعى
//     // SchoolFrom { get; set; }
//     // SchoolTo { get; set; }
//     // GradeTo { get; set; }
//     // DivisionTo { get; set; }
//     // studentNumber

//     // طلب تعديل هويه
//     name:{ar:'احمد'},
//     nickName:{ar:'الصياد'},
//     birthDate:'1/10/2020',
//     gender:'Female',
//     religionName:{ar:'مسلم'},
//     nationalityName:{ar:'مسلم'},

// // اعاده ربط الابن بولى الامر
// // guardian id name
// // +student

// //     pesonalImagePath
// //      name:{ en:'',ar:''},
// //       pesonalImagePath:'',
// //       surname:{ en:'',ar:''},
// //       gender: '', //Enum
// //       birthDate:'',
// //       nationality:{},
// //       relativeRelation: {id:'', name:{en:'', ar:''}},
// //       passportNum:'',
// //       religion: {id:'', name:{en:'', ar:''}},
// //       attachments: [{name:'', url:'',comment:''}]

// // بهويه
// // pesonalImagePath:'',
// // identityNum:'',
// // relativeRelation: {id:'', name:{en:'', ar:''}},
// // attchments:[{title:'', name:'', url:'', comment?:''}],


// // subjectName

//     student: {
//       "id": 20,
//       status: StatusEnum.Withdrawn,
//       "name": {
//           "en": "mai Mohamed Ragab",
//           "ar": "مي محمد عيسي"
//       },
//       parsonalImagePath: "123",
//       isTalented: true,
//       isChildOfAMartyr: false,
//       age: 13,
//       grade: {
//           "id": 1,
//           "name": {
//               "en": "string",
//               "ar": "string"
//           }
//       },
//       nationality: {
//           "id": 1,
//           "name": {
//               "en": "Egypt",
//               "ar": "مصر"
//           }
//       },
//       birthDate: "2010-10-09T10:00:00+00:00",
//       gender: "Female",
//       identityNum: 55,
//       relativeRelation: {
//           "id": 1,
//           "name": {
//               "en": "father",
//               "ar": "الاب"
//           }
//       },
//       attachments:[
//       {name:{en:'',ar:'pdf.1 ملف خلاصة القيد'}, url:'www.google.com'},
//       {name:{en:'',ar:'pdf.2 ملف خلاصة القيد'}, url:'www.google.com'}
//     ]
//   },


//   }

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
  

  rejectReason$ = this.indexesService.getIndext(IndexesEnum.ReasonsForRefusingToRemoveAStudentFromASchool )

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
    private requestsService:SystemRequestService,
    private toaster:ToastrService,
    private indexesService:IndexesService
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

      res.task.options = res?.task?.options.map(el=>({...el,isLoading:false}))

      this.timeline=res
      // this.timeline.task.options.map(el=> el.id)
    })
 
  }

  actionTaken
  isActionLoading=[false,false,false]
  isLoading=false

  onActionTaken(actionTaken: WorkflowOptions){
    this.actionTaken = actionTaken
    if(!actionTaken.isCommentRequired && actionTaken.title.en=='reject'){
      this.rejectReasonModel = true
      return
    }
    this.completeRequestAction(actionTaken)

  }

  completeRequestAction(actionTaken?){
   this.isLoading=true
   actionTaken.isLoading=true
    let action={
      ...this.reqActionsForm,
      optionId: actionTaken?.id || this.actionTaken.id,
      requestType: this.requestDetails.requestType,
    };

    this.requestsService.changeRequestState(action).subscribe(res=>{
      this.rejectReasonModel = false

      this.getRequestDetails()
      this.getRequestTimeline()
      this.toaster.success(this.translate.instant('toasterMessage.requestStatusUpdated'))
      this.isLoading=false
      actionTaken.isLoading=true
    },()=>{
      this.isLoading=false
      actionTaken.isLoading=true
      this.toaster.error(this.translate.instant('toasterMessage.error'))
    })
  }


  addAttachmentToAction(files:CustomFile[]){
    let file={
      title: files.length ? files[0].name : '',
      path: '',
      data: '',
      url: files.length ? files[0].url: '',
      id: 0 
    };
    // this.requestsService.addAttachmentToAction(this.actionTaken.id, file).subscribe(res=>{

    // })
  }

  isRequestRelatedToStudent(requestType:RequestsEnum){
    const requests = [
      'StudentRegradingRequest',
      'DeleteStudentRequest',
      'RegestrationApplicationRequest',
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


   checkDashboardHeader()
   {
       if(this.currentUserScope==UserScope.Employee)
     {
    
     this.componentHeaderData.breadCrump= [
      {label: this.translate.instant('dashboard.myRequest.My requests'),  routerLink:'/dashboard/performance-managment/RequestList',routerLinkActiveOptions:{exact: true}},
      {label: this.translate.instant('dashboard.myRequest.Order details'),routerLink:`/dashboard/performance-managment/RequestList/details/${this.requestId}`},
       ]
    
   
     }
     else if (this.currentUserScope==UserScope.SPEA)
     {
     this.componentHeaderData.breadCrump= [
      {label: this.translate.instant('dashboard.myRequest.My requests'),  routerLink:'/dashboard/performance-managment/RequestList',routerLinkActiveOptions:{exact: true}},
      {label: this.translate.instant('dashboard.myRequest.Order details'),routerLink:`/dashboard/performance-managment/RequestList/details/${this.requestId}`},
      // {label: this.translate.instant('dashboard.myRequest.School enrollment application'),routerLink:'/dashboard/performance-managment/RequestList/Requestdetails'}
       ]
     
     }
     
     else if (this.currentUserScope==UserScope.Guardian)
     {
     this.componentHeaderData.breadCrump= [
			{label: this.translate.instant('dashboard.myRequest.My requests'),routerLink:`/dashboard/performance-managment/RequestList`,routerLinkActiveOptions:{exact: true}},
      {label: this.translate.instant('dashboard.myRequest.Order details'), routerLink:`/dashboard/performance-managment/RequestList/details/${this.requestId}`},
      // {label: this.translate.instant('dashboard.myRequest.School enrollment application'),}
       ]
   
     }
     
   }
   get userScope() 
   { 
     return UserScope 
   }
}
