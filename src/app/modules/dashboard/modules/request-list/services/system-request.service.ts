import { of, finalize, take, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { Filter } from 'src/app/core/models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
import { getLocalizedValue } from 'src/app/core/classes/helpers';
import { requestTypeEnum } from 'src/app/shared/enums/system-requests/requests.enum';

@Injectable({
  providedIn: 'root'
})
export class SystemRequestService {
requestList=[];
  constructor(private http:HttpHandlerService,private tableLoaderService: LoaderService,private translate:TranslateService) {

    this.requestList=[
      {name:this.translate.instant('dashboard.Requests.FlexibleHolidayRequest'),value:requestTypeEnum.FlexibleHolidayRequest},
      {name:this.translate.instant('dashboard.Requests.StudentRegradingRequest'),value:requestTypeEnum.StudentRegradingRequest},
      {name:this.translate.instant('dashboard.Requests.DeleteStudentRequest'),value:requestTypeEnum.DeleteStudentRequest},
      {name:this.translate.instant('dashboard.Requests.RegestrationApplicationRequest'),value:requestTypeEnum.RegestrationApplicationRequest},
      {name:this.translate.instant('dashboard.Requests.MassTransferRequest'),value:requestTypeEnum.MassTransferRequest},
      {name:this.translate.instant('dashboard.Requests.ModifyIdentityRequest'),value:requestTypeEnum.ModifyIdentityRequest},
      {name:this.translate.instant('dashboard.Requests.BoardCertificateRequest'),value:requestTypeEnum.BoardCertificateRequest},
      {name:this.translate.instant('dashboard.Requests.GradesCertificateRequest'),value:requestTypeEnum.GradesCertificateRequest},
      {name:this.translate.instant('dashboard.Requests.AcademicSequenceCertificateRequest'),value:requestTypeEnum.AcademicSequenceCertificateRequest},
      {name:this.translate.instant('dashboard.Requests.ModifyIdentityRequestCaseStudentNotHaveId'),value:requestTypeEnum.ModifyIdentityRequestCaseStudentNotHaveId},
      {name:this.translate.instant('dashboard.Requests.RegestrationRequestForWithrawan'),value:requestTypeEnum.RegestrationRequestForWithrawan},
      {name:this.translate.instant('dashboard.Requests.WithdrawalRequest'),value:requestTypeEnum.WithdrawalRequest},
      {name:this.translate.instant('dashboard.Requests.RelinkChildToGuardianRequestToSPEA'),value:requestTypeEnum.RelinkChildToGuardianRequestToSPEA},
      {name:this.translate.instant('dashboard.Requests.RelinkChildToGuardianRequestToScool'),value:requestTypeEnum.RelinkChildToGuardianRequestToScool},
      {name:this.translate.instant('dashboard.Requests.exemptionFromSubjectRequest'),value:requestTypeEnum.ExemptionFromSubjectRequest},

    ]
   }



  getUserRequests(filter?:Filter){
  //  return of(this.requestArray)
  this.tableLoaderService.isLoading$.next(true)
   return this.http.get(`/Student/user-requests`,filter)
   .pipe(
    take(1),
    finalize(()=> {
      this.tableLoaderService.isLoading$.next(false)
    }))
  }

  getChildRequests(childId, filter?:Filter ){
    //  return of(this.requestArray)
    this.tableLoaderService.isLoading$.next(true)
     return this.http.get(`/Child/child-requests-list/${childId}`,filter)
     .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
    }

  userRequestsToExport(filter?:Filter){
    //  return of(this.requestArray)
    this.tableLoaderService.isLoading$.next(true)
     return this.http.get(`/Student/user-requests`,filter)
     .pipe( map(res=>{
      return res.data.map(item =>{
          return {
            [this.translate.instant('dashboard.Requests.requestNumber')]: getLocalizedValue(item?.name),
            [this.translate.instant('dashboard.Requests.requestType')]: this.translate.instant('dashboard.Requests.'+item.requestType),
            [this.translate.instant('dashboard.Subjects.Created by')]:  getLocalizedValue(item?.createdBy),
            [this.translate.instant('shared.Created Date')]: item?.createdDate,
            [this.translate.instant('dashboard.Requests.Status')]: this.translate.instant('dashboard.Requests.'+item.requestStatus),
            [this.translate.instant('dashboard.myRequest.The request is associated with')]: getLocalizedValue(item?.relatedSon),


          }
        })
      }))
    }
  

  getMyRequests(filter){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/Guardian/my-requests-list`,filter)    
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  myReqsToExport(filter){
    return this.http.get(`/Guardian/my-requests-list`,filter)    
    .pipe( map(res=>{
      return res.data.map(item =>{
        return {
          [this.translate.instant('dashboard.Requests.requestNumber')]: getLocalizedValue(item?.name),
          [this.translate.instant('dashboard.Requests.requestType')]: this.translate.instant('dashboard.Requests.'+item.requestType),
          [this.translate.instant('dashboard.Subjects.Created by')]:  getLocalizedValue(item?.createdBy),
          [this.translate.instant('shared.Created Date')]: item?.createdDate,
          [this.translate.instant('dashboard.Requests.Status')]: this.translate.instant('dashboard.Requests.'+item.requestStatus),
          [this.translate.instant('dashboard.myRequest.The request is associated with')]: getLocalizedValue(item?.relatedSon),

        }
      })
    }))
  }

  getRequestDetails(instanceId){
    return this.http.get(`/Student/request-details/${instanceId}`).pipe(take(1))
  }

  getRequestTimline(instanceId){
    return this.http.get(`/Instance/Get/${instanceId}`).pipe(take(1))
  }
  

  changeRequestState(reqBody){
    return this.http.post(`/Workflow/PerformAction`,reqBody).pipe(take(1))
  }


  AddFirstRequestComment( reqBody){
    return this.http.post(`/Request/rquest-comment`,reqBody).pipe(take(1))
  }

  replayToRequestComment(reqBody){
    return this.http.post(`/Request/rquest-comment-reply`,reqBody).pipe(take(1))
  }

  
  withdrawReq(id){
    return this.http.put(`/Student/withdraw-request/${id}`).pipe(take(1))
  }
  // خلي بالك لما تيجي تعمل الطلبات ابقي اعمل دي بردو لان الطلبات متعملتش كاباك
// usersToExport(filter){
//   return this.http.get('/Account/Search',filter)
//   .pipe(
//     map(res=>{
//       return res
//       .data.map(user =>{
//         return {
//           [this.translate.instant('shared.Full Name')]: user.fullName.ar,
//           [this.translate.instant('shared.email')]: user.email,
//           [this.translate.instant('shared.Identity Number')]: user.emiratesIdNumber,
//           [this.translate.instant('shared.phoneNumber')]: user.phoneNumber,
//           [this.translate.instant('shared.Created Date')]: user.createdDate,
//           [this.translate.instant('dashboard.UserInformation.User Status')]: user.isActive == StatusEnum.Active? this.translate.instant('shared.allStatus.SchoolActive') : this.translate.instant('shared.allStatus.SchoolInactive')  ,

//         }
//       })
//     }))
// }

}
