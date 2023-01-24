import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { HttpHandlerService } from '../http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
import {  BehaviorSubject, map,  take } from 'rxjs';
import { SchoolsService } from 'src/app/modules/dashboard/modules/schools/services/schools/schools.service';
import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  MAIN_LINK: string = 'https://jobs-nodejs.herokuapp.com/api/users/signin/';
  signUpWaysList;
  public isNewAccountOpened= new BehaviorSubject<boolean>(false);
  public isForgetModelOpened= new BehaviorSubject<boolean>(false);
 
  constructor(private http: HttpHandlerService, private userService:UserService,private router: Router,private schoolServics:SchoolsService) { 

 
  }
  // login(user: any) {
  //   return this.http.post<{ token: string }>(this.MAIN_LINK, user);
  // }

  sendOtpToUser(account)
  {
    return this.http.post("/Account/send-otp",account)
  }
  confirmOtp(account,otp)
  {
    return this.http.post(`/Account/otp-validation?otp=${otp}`,account)
  }
  savePassword(password)
  {
    return this.http.post(`/Account/set-password`,password)
  }
  saveAccount(newAccount)
  {
    return this.http.post(`/Account/guardian-account`,newAccount)
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

  forgotPassword(account) {
    return this.http.post("/User/ForgotPassword",account )
  }

  resetPassword(account) {
    return this.http.post("/User/ResetPassword", account)
  }
  signInWithIdentity(lang){
    return this.http.get("/Account/UAEPASS",lang)
  }
  getUAEUSER(code){
    return this.http.get(`/Account/UAEPASS/GetToken?authenticationCode=${code}`)
    .pipe(take(1),
    map((res)=>{
      return {
        token:res.token,
        scope:res.scope,
        user:{...res}
      }

     }
    ))
    
  }

  schoolIDOfCurrentSchoolEmployee(){
    
    return this.http.get('/current-user/school-employee')

    .pipe(take(1),map((res)=>{
      if(res)
     { 
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
    }
    }))
  }

  getSchoolNameRelatedToCurrentEmployee()
  {
   
    return this.http.get('/current-user/school-employee')

    .pipe(take(1),map((res)=>{
      if(res)
     { if(localStorage.getItem('preferredLanguage')=='ar')
      {
     
        return res.result.school.name.ar;
      }
      else{
        return res.result.school.name.en;
      }
      
    }
        
    }))
    
    

  }
  getCurrentGuardian(){
    
    return this.http.get('/Guardian/guardian-by-user-id')

    .pipe(take(1),map((res)=>{
     
        this.userService.currentGuardian.next(JSON.stringify(res))
        this.userService.setCurrentGuardian(JSON.stringify(res))
        return JSON.stringify(res);
        
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
   localStorage.removeItem('$AJ$currentGuardian');
   localStorage.removeItem('$AJ$yearId');
   this.userService.clear();
   this.userService.userClaims={};
  }
}
