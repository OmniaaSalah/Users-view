import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { HttpHandlerService } from '../http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
import {  map,  take } from 'rxjs';
import { SchoolsService } from 'src/app/modules/dashboard/modules/schools/services/schools/schools.service';
import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  MAIN_LINK: string = 'https://jobs-nodejs.herokuapp.com/api/users/signin/';
  signUpWaysList;

  constructor(private http: HttpHandlerService, private userService:UserService,private router: Router,private schoolServics:SchoolsService) { 

 
  }
  // login(user: any) {
  //   return this.http.post<{ token: string }>(this.MAIN_LINK, user);
  // }

  sendOtpToUser(account)
  {
    return this.http.post("/Account/send-otp",account)
  }

  getToken() {
    return localStorage.getItem('token');
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  validateUsername(userName: string) {
    return this.http.post("/User/Auth/Validate", { userName })
  }

  authenticate(token: string, password: string) {
    return this.http.post("/User/Auth/Authenticate", { password }, null, { Authorization: `Bearer ${token}` })
  }

  setPassword(token: string, password: string, otp: string) {
    return this.http.post("/Account/Auth/SetPassword", { password, otp }, null, { Authorization: `Bearer ${token}` })
  }

  getMyProfile() {
    return this.http.get("/Account/Agent/GetMyProfile")
  }

  updateProfile(updatedUser: any) {
    return this.http.put("/Account/Agent/Update", updatedUser)
  }

  forgotPassword(username: any) {
    return this.http.post("/User/ForgotPassword", { username })
  }

  resetPassword(passwords: any) {
    return this.http.post("/User/ResetPassword", passwords)
  }
  signInWithIdentity(lang){
    return this.http.get("/Account/UAEPASS",lang)
  }
  getUAEUSER(code){
    return this.http.get(`/Account/UAEPASS/GetToken?authenticationCode=${code}`)
  }

  schoolIDOfCurrentSchoolEmployee(){
    
    return this.http.get('/current-user/school-employee')

    .pipe(take(1),map((res)=>{
      if(localStorage.getItem('preferredLanguage')=='ar')
      {
        this.userService.currentUserName.next(res.result.arabicName+" "+res.result.arabicSurname)
        this.userService.setCurrentUserName(res.result.arabicName+" "+res.result.arabicSurname)
      }
      else{
        this.userService.currentUserName.next(res.result.englishName+" "+res.result.englishSurname)
        this.userService.setCurrentUserName(res.result.arabicName+" "+res.result.arabicSurname)
      }
      
       return res.result.school.id;
        
    }))
  }
  getSchoolNameRelatedToCurrentEmployee()
  {
   
    return this.http.get('/current-user/school-employee')

    .pipe(take(1),map((res)=>{
      if(localStorage.getItem('preferredLanguage')=='ar')
      {
     
        return res.result.school.name.ar;
      }
      else{
        return res.result.school.name.en;
      }
      
       
        
    }))
    
    

  }

  logOut()
  {
    if(localStorage.getItem('UaeLogged')){
      localStorage.removeItem('UaeLogged')
      localStorage.removeItem('schoolId')
      window.location.href = `https://stg-id.uaepass.ae/idshub/logout?redirect_uri=${environment.logoutRedirectUrl}`
   }else{
     this.router.navigate(['/auth/login']);
   }
 
   localStorage.removeItem('$AJ$yearId');
   this.userService.clear();
   this.userService.userClaims={};
  }
}
