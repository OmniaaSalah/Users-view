import { of, finalize, take, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
import { getLocalizedValue } from 'src/app/core/helpers/helpers';
import { requestTypeEnum } from 'src/app/shared/enums/system-requests/requests.enum';
import { HttpStatusCodeEnum } from 'src/app/shared/enums/http-status-code/http-status-code.enum';
import { StatusEnum, UserRequestsStatus } from 'src/app/shared/enums/status/status.enum';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';

@Injectable({
  providedIn: 'root'
})
export class SystemRequestService {

  constructor(
    private http:HttpHandlerService,
    private tableLoaderService: LoaderService
    ,private translate:TranslateService,
    private userService:UserService) {}


  getStatusOptions(){
    return [
      {name:this.translate.instant('dashboard.Requests.Pending'), value: UserRequestsStatus.Pending},
      {name:this.translate.instant('dashboard.Requests.Returned'), value: UserRequestsStatus.ModificationRequest},
      {name:this.translate.instant('dashboard.Requests.Accepted'), value:[ UserRequestsStatus.Accepted,  UserRequestsStatus.Approved]},
      {name:this.translate.instant('dashboard.Requests._TentativelyAccepted'), value: UserRequestsStatus.TentativelyAccepted},
      {name:this.translate.instant('dashboard.Requests.FinalApproval'), value: UserRequestsStatus.FinalApproval},
      {name:this.translate.instant('dashboard.Requests.Rejected'), value: UserRequestsStatus.Rejected},
      {name:this.translate.instant('dashboard.Requests.Canceled'), value: UserRequestsStatus.Canceled},

    ]
  }

  getReqsTypes(){
    let scope = this.userService.getScope()

    if(scope ===UserScope.Guardian){
      return [
        {name:this.translate.instant('dashboard.Requests.RegestrationApplicationRequest'), value: [requestTypeEnum.RegestrationApplicationRequest,requestTypeEnum.RegestrationRequestForWithrawan]},
        // {name:this.translate.instant('dashboard.Requests.RegestrationRequestForWithrawan'), value: requestTypeEnum.RegestrationRequestForWithrawan},
        {name:this.translate.instant('dashboard.Requests.StudentRegradingRequest'), value: requestTypeEnum.StudentRegradingRequest},
        {name:this.translate.instant('dashboard.Requests.DeleteStudentRequest'), value: requestTypeEnum.DeleteStudentRequest},
        {name:this.translate.instant('dashboard.Requests.exemptionFromSubjectRequest'), value: requestTypeEnum.ExemptionFromSubjectRequest},
        {name:this.translate.instant('dashboard.Requests.ModifyIdentityRequest'), value: requestTypeEnum.ModifyIdentityRequest},
        {name:this.translate.instant('dashboard.Requests.ModifyIdentityRequestCaseStudentNotHaveId'), value: requestTypeEnum.ModifyIdentityRequestCaseStudentNotHaveId},
        {name:this.translate.instant('dashboard.Requests.BoardCertificateRequest'), value: requestTypeEnum.BoardCertificateRequest},
        // {name:this.translate.instant('dashboard.Requests.GradesCertificateRequest'), value: requestTypeEnum.GradesCertificateRequest},

        {name:this.translate.instant('dashboard.Requests.AcademicSequenceCertificateRequest'), value: requestTypeEnum.AcademicSequenceCertificateRequest},
        {name:this.translate.instant('dashboard.Requests.WithdrawalRequest'), value: requestTypeEnum.WithdrawalRequest},
        {name:this.translate.instant('dashboard.Requests.RelinkChildToGuardianRequestToScool'), value: requestTypeEnum.RelinkChildToGuardianRequestToScool},
        {name:this.translate.instant('dashboard.Requests.RelinkChildToGuardianRequestToSPEA'), value: requestTypeEnum.RelinkChildToGuardianRequestToSPEA},

      ]
    }else{
      return [
        {name:this.translate.instant('dashboard.Requests.RegestrationApplicationRequest'), value: [requestTypeEnum.RegestrationApplicationRequest, requestTypeEnum.RegestrationRequestForWithrawan]},
        // {name:this.translate.instant('dashboard.Requests.RegestrationRequestForWithrawan'), value: requestTypeEnum.RegestrationRequestForWithrawan},
        {name:this.translate.instant('dashboard.Requests.StudentRegradingRequest'), value: requestTypeEnum.StudentRegradingRequest},
        {name:this.translate.instant('dashboard.Requests.DeleteStudentRequest'), value: requestTypeEnum.DeleteStudentRequest},
        {name:this.translate.instant('dashboard.Requests.exemptionFromSubjectRequest'), value: requestTypeEnum.ExemptionFromSubjectRequest},
        {name:this.translate.instant('dashboard.Requests.ModifyIdentityRequest'), value: requestTypeEnum.ModifyIdentityRequest},
        {name:this.translate.instant('dashboard.Requests.ModifyIdentityRequestCaseStudentNotHaveId'), value: requestTypeEnum.ModifyIdentityRequestCaseStudentNotHaveId},
        {name:this.translate.instant('dashboard.Requests.FlexibleHolidayRequest'), value: requestTypeEnum.FlexibleHolidayRequest},
        {name:this.translate.instant('dashboard.Requests.MassTransferRequest'), value: requestTypeEnum.MassTransferRequest},
        {name:this.translate.instant('dashboard.Requests.BoardCertificateRequest'), value: requestTypeEnum.BoardCertificateRequest},
        {name:this.translate.instant('dashboard.Requests.GradesCertificateRequest'), value: requestTypeEnum.GradesCertificateRequest},

        {name:this.translate.instant('dashboard.Requests.AcademicSequenceCertificateRequest'), value: requestTypeEnum.AcademicSequenceCertificateRequest},
        {name:this.translate.instant('dashboard.Requests.WithdrawalRequest'), value: requestTypeEnum.WithdrawalRequest},
        {name:this.translate.instant('dashboard.Requests.RelinkChildToGuardianRequestToScool'), value: requestTypeEnum.RelinkChildToGuardianRequestToScool},
        {name:this.translate.instant('dashboard.Requests.RelinkChildToGuardianRequestToSPEA'), value: requestTypeEnum.RelinkChildToGuardianRequestToSPEA},

      ]
    }
  }

  getUserRequests(filter?:SearchModel){
  //  return of(this.requestArray)
  this.tableLoaderService.isLoading$.next(true)
   return this.http.post(`/Student/user-requests`,filter)
   .pipe(
    map(res=>{
      res.data = res.data?.map(item =>{
        return {
          ...item,
          requestStatus: item?.requestType ==requestTypeEnum.RegestrationApplicationRequest ? this.getMappedStatus(item?.requestStatus) : item?.requestStatus
        }
      })

      return res
    }),
    take(1),
    finalize(()=> {
      this.tableLoaderService.isLoading$.next(false)
    }))
  }



  userRequestsToExport(filter?:SearchModel){
    //  return of(this.requestArray)
    this.tableLoaderService.isLoading$.next(true)
     return this.http.post(`/Student/user-requests`,filter)
     .pipe( map(res=>{
      return res.data.map(item =>{
          return {
            [this.translate.instant('dashboard.Requests.requestNumber')]: item?.requestNumber,
            [this.translate.instant('dashboard.Requests.requestType')]: this.translate.instant('dashboard.Requests.'+item.requestType),
            [this.translate.instant('dashboard.Subjects.Created by')]:  getLocalizedValue(item?.createdBy),
            [this.translate.instant('shared.Created Date')]: item?.createdDate,
            [this.translate.instant('dashboard.Requests.Status')]: this.translate.instant('dashboard.Requests.'+item.requestStatus),

            [this.translate.instant('shared.school')]: getLocalizedValue(item?.school?.name) || this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.curriculum')]: getLocalizedValue(item?.curriculum?.name) || this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.schools.student')]: getLocalizedValue(item?.student?.name) || this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.schools.studentId')]: getLocalizedValue(item?.student?.id) || this.translate.instant('shared.notFound'),


            [this.translate.instant('dashboard.myRequest.The request is associated with')]: getLocalizedValue(item?.relatedSon),
            [this.translate.instant('dashboard.myRequest.The request is associated with')]: getLocalizedValue(item?.relatedSon),


          }
        })
      }))
    }



  getMyRequests(filter){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.post(`/Guardian/my-requests-list`,filter)
    .pipe(
      map(res=>{
        res.data = res.data?.map(item =>{
          return {
            ...item,
            requestStatus: item?.requestType ==requestTypeEnum.RegestrationApplicationRequest ? this.getMappedStatus(item?.requestStatus) : item?.requestStatus
          }
        })

        return res
      }),
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }


  getMappedStatus(status:UserRequestsStatus){
    return status==UserRequestsStatus.TentativelyAccepted ? UserRequestsStatus.Pending :
            status==UserRequestsStatus.Approved ? UserRequestsStatus.TentativelyAccepted :
            status
  }
  myReqsToExport(filter){
    return this.http.post(`/Guardian/my-requests-list`,filter)
    .pipe( map(res=>{
      return res.data.map(item =>{
        return {
          [this.translate.instant('dashboard.Requests.requestNumber')]: item?.requestNumber,
          [this.translate.instant('dashboard.Requests.requestType')]: this.translate.instant('dashboard.Requests.'+item.requestType),
          [this.translate.instant('shared.school')]: getLocalizedValue(item?.school?.name) || this.translate.instant('shared.notFound'),
          [this.translate.instant('shared.curriculum')]: getLocalizedValue(item?.curriculum?.name) || this.translate.instant('shared.notFound'),
          [this.translate.instant('dashboard.Subjects.Created by')]:  getLocalizedValue(item?.createdBy),
          [this.translate.instant('shared.Created Date')]: item?.createdDate,
          [this.translate.instant('dashboard.Requests.Status')]: this.translate.instant('dashboard.Requests.'+item.requestStatus),
          [this.translate.instant('dashboard.myRequest.The request is associated with')]: getLocalizedValue(item?.relatedSon),

        }
      })
    }))
  }


  getChildRequests(childId, filter?:SearchModel ){
    //  return of(this.requestArray)
    this.tableLoaderService.isLoading$.next(true)
     return this.http.post(`/Child/child-requests-list/${childId}`,filter)
     .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
    }

    getStudentRequests(studentId, filter?:SearchModel ){
      //  return of(this.requestArray)
      this.tableLoaderService.isLoading$.next(true)
       return this.http.post(`/Student/student-requests-list/${studentId}`,filter)
       .pipe(
        take(1),
        finalize(()=> {
          this.tableLoaderService.isLoading$.next(false)
      }))
    }
  getRequestDetails(instanceId){
    return this.http.get(`/Student/request-details/${instanceId}`)
    .pipe(
      map(res=>{
        res.result = {
            ...res.result,
            requestStatus: res.result?.requestType ==requestTypeEnum.RegestrationApplicationRequest ? this.getMappedStatus(res.result?.requestStatus) : res.result?.requestStatus
          }
        return res
      }),
      take(1))
  }

  getRequestTimline(instanceId){
    return this.http.get(`/Instance/Get/${instanceId}`).pipe(take(1))
  }

  getRequestStates(instanceId){
    return this.http.get(`/Instance/GetWitoutTasks/${instanceId}`)
  }

  getperformedAction(instanceId){
    return this.http.get(`/Instance/Actions/Get/${instanceId}`)
  }


  getRequestOptions(instanceId){
      return this.http.get(`/Task/Instance/Get/${instanceId}`)
      .pipe(
        take(1),
        map(res=>{

          if(!res) return {options: []}
          else return res
        })
        )
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


  deleteMainComment(id){
    return this.http.delete(`/Request/delete-comment/${id}`).pipe(take(1))

  }

  deleteReplay(id){
    return this.http.delete(`/Request/delete-reply/${id}`).pipe(take(1))
  }

  withdrawReq(id, reqType){
    const requests = [
      'BoardCertificateRequest',
      'GradesCertificateRequest',
      'AcademicSequenceCertificateRequest',
   ]
    if( requests.includes(reqType)){
      return this.http.put(`/Certificate/withdraw-certificate-request/${id}`).pipe(
        map(res=>{
          if(res.statusCode==HttpStatusCodeEnum.BadRequest) throw new Error(getLocalizedValue(res?.errorLocalized))
          else return res
        }),
        take(1))
    }else{
      return this.http.put(`/Student/withdraw-request/${id}`).pipe(
        map(res=>{
          if(res.statusCode==HttpStatusCodeEnum.BadRequest) throw new Error(getLocalizedValue(res?.errorLocalized))
          else return res
        }),
        take(1))

    }


  }

  reOpenRequest(reqBody){
    return this.http.post('/Workflow/re-open-the-request', reqBody).pipe(take(1))
  }

}
