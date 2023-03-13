import {HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl = environment.serverUrl;
  private headers = new HttpHeaders();
 constructor(private http:HttpHandlerService) {
    this.headers = this.headers.set('content-type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
  }

   
  sendDataFromEmpToGuardian(form){
    return this.http.post('/Message/school-to-guardian',form)
  }

  sendDataFromSpeaToEmp(form){
    return this.http.post('/Message/spea-to-employee',form)
  }

  sendDataFromGuardianToSchool(form){
    return this.http.post('/Message/guardian-to-school-employee',form)
  }

  sendDataFromEmployeeTOSPEA(form){
    return this.http.post('/Message/school-employee-to-spea',form)
  }

  sendReply(id,form){
    return this.http.post(`/Message/reply-message/${id}`,form)
  }

  getApiSchool(searchModel){
    return this.http.get('/School',searchModel)
  }

  getcurr(){
    return this.http.get('/Curriculum')
  }

  getadd(){
    return this.http.get('/Address/states')
  }

  getmessagesTypes(){
    return this.http.get('/IndexList')
  }

  getGuardian(searchModel){
   return this.http.get('/Guardian/filter-gurdians',searchModel)
  }

  getMessagesGuardian(id,searchModel){
    return this.http.get(`/Message/guardian-messages/${id}`,searchModel)
  }

  getMessagesSpea(id,searchModel){
    return this.http.get(`/Message/spea-employee-messages/${id}`,searchModel)
  }

  getMessagesSchoolEmp(id,searchModel){
    return this.http.get(`/Message/school-messages/${id}`,searchModel)
  }

  // getSchoolIdFromEmp(){
  //   return this.http.get('/current-user/school-employee')
  // }

  getMessageDetailsById(id){
    return this.http.get(`/Message/${id}`)
  }
}
