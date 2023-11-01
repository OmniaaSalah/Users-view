import {HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  unReadedMessagesCount$ = new BehaviorSubject(0)

 constructor(private http:HttpHandlerService) {

  }

  getCurrentUserMessages(id,userScope,searchModel?){
    switch (userScope) {
      case UserScope.Employee:
        return this.http.get(`/Message/school-messages/${id}`,searchModel).pipe(take(1))
      break;

      case UserScope.Guardian:
        return this.http.get(`/Message/guardian-messages/${id}`,searchModel).pipe(take(1))
      break;

      case UserScope.SPEA:
        return this.http.get(`/Message/spea-employee-messages/${id}`,searchModel).pipe(take(1))
      break;
   }
  }


  getMessagesGuardian(id,searchModel){
    return this.http.get(`/Message/guardian-messages/${id}`,searchModel).pipe(take(1))
  }

  getMessagesSpea(id,searchModel){
    return this.http.get(`/Message/spea-employee-messages/${id}`,searchModel).pipe(take(1))
  }

  getMessagesSchoolEmp(id,searchModel){
    return this.http.get(`/Message/school-messages/${id}`,searchModel).pipe(take(1))
  }

  sendDataFromEmpToGuardian(form){
    return this.http.post('/Message/school-to-guardian',form).pipe(take(1))
  }

  sendDataFromSpeaToEmp(form){
    return this.http.post('/Message/spea-to-employee',form).pipe(take(1))
  }

  sendDataFromGuardianToSchool(form){
    return this.http.post('/Message/guardian-to-school-employee',form).pipe(take(1))
  }

  sendDataFromEmployeeTOSPEA(form){
    return this.http.post('/Message/school-employee-to-spea',form).pipe(take(1))
  }

  sendReply(id,form){
    return this.http.post(`/Message/reply-message/${id}`,form).pipe(take(1))
  }

  getApiSchool(searchModel){
    return this.http.get('/School',searchModel).pipe(take(1))
  }

  getmessagesTypes(){
    return this.http.get('/IndexList').pipe(take(1))
  }

  getGuardian(searchModel){
   return this.http.get('/Guardian/filter-gurdians',searchModel).pipe(take(1))
  }



  // getSchoolIdFromEmp(){
  //   return this.http.get('/current-user/school-employee')
  // }

  getMessageDetailsById(id){
    return this.http.get(`/Message/${id}`)
  }

  changeMessageStatus(data){
   return this.http.put('/Message/update-message', data).pipe(take(1))
  }

  reduceReplyCount(messageId)
  {
    return this.http.put(`/Message/reduce-reply-count/${messageId}`).pipe(take(1))
  }
}
