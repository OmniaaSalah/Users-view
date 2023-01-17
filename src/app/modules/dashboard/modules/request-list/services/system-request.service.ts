import { of, finalize, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { Filter } from 'src/app/core/models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SystemRequestService {

  constructor(private http:HttpHandlerService,private tableLoaderService: LoaderService,) { }

   requestArray = {
    "totalAllData": 7,
    "total": 7,
    "data":[
      {
        id:1,
        "requestNumber": "#123456",
        "requestType": {en:'',ar:'سحب'},
        "createdBy": {en:'',ar:'محمد علي'},
        "date": "14-09-2022 - 09:38 AM",
        "reuestStatus": {en:'',ar:'مقبول'},// معرفش دي هتكون enum ?
        "relatedWith": {en:'',ar:'سامر'},
      },
      {
        id:2,
        "requestNumber": "#123456",
        "requestType": {en:'',ar:'سحب'},
        "createdBy": {en:'',ar:'محمد علي'},
        "date": "14-09-2022 - 09:38 AM",
        "reuestStatus": {en:'',ar:'مقبول'},// معرفش دي هتكون enum ?
        "relatedWith": {en:'',ar:'سامر'},
      },
      {
        id:3,
        "requestNumber": "#123456",
        "requestType": {en:'',ar:'سحب'},
        "createdBy": {en:'',ar:'محمد علي'},
        "date": "14-09-2022 - 09:38 AM",
        "reuestStatus": {en:'',ar:'مقبول'},// معرفش دي هتكون enum ?
        "relatedWith": {en:'',ar:'سامر'},
      },
      {
        id:4,
        "requestNumber": "#123456",
        "requestType": {en:'',ar:'سحب'},
        "createdBy": {en:'',ar:'محمد علي'},
        "date": "14-09-2022 - 09:38 AM",
        "reuestStatus": {en:'',ar:'مقبول'},// معرفش دي هتكون enum ?
        "relatedWith": {en:'',ar:'سامر'},
      },
      {
        id:5,
        "requestNumber": "#123456",
        "requestType": {en:'',ar:'سحب'},
        "createdBy": {en:'',ar:'محمد علي'},
        "date": "14-09-2022 - 09:38 AM",
        "reuestStatus": {en:'',ar:'مقبول'},// معرفش دي هتكون enum ?
        "relatedWith": {en:'',ar:'سامر'},
      },
      {
        id:6,
        "requestNumber": "#123456",
        "requestType": {en:'',ar:'سحب'},
        "createdBy": {en:'',ar:'محمد علي'},
        "date": "14-09-2022 - 09:38 AM",
        "reuestStatus": {en:'',ar:'مقبول'},// معرفش دي هتكون enum ?
        "relatedWith": {en:'',ar:'سامر'},
      },
      {
        id:7,
        "requestNumber": "#123456",
        "requestType": {en:'',ar:'سحب'},
        "createdBy": {en:'',ar:'محمد علي'},
        "date": "14-09-2022 - 09:38 AM",
        "reuestStatus": {en:'',ar:'مقبول'},// معرفش دي هتكون enum ?
        "relatedWith": {en:'',ar:'سامر'},
      },
    ]
  }

  getUserRequests(filter?:Partial<Filter>){
  //  return of(this.requestArray)
  this.tableLoaderService.isLoading$.next(true)
   return this.http.get(`/Student/user-requests`,filter)
   .pipe(
    take(1),
    finalize(()=> {
      this.tableLoaderService.isLoading$.next(false)
    }))
  }

  getGardianRequests(filter){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/Guardian/guardian-requests-list`)    
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
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

  addAttachmentToAction(actionId, reqBody){
    return this.http.post(`/Action/Attachment/Add/${actionId}`,reqBody).pipe(take(1))
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
