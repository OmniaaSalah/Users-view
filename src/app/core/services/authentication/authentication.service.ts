import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { HttpHandlerService } from '../http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
import {  map,  take } from 'rxjs';
import { SchoolsService } from 'src/app/modules/dashboard/modules/schools/services/schools/schools.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  MAIN_LINK: string = 'https://jobs-nodejs.herokuapp.com/api/users/signin/';
  signUpWaysList;

  constructor(private http: HttpHandlerService, private userService:UserService,private router: Router,private translate:TranslateService,private schoolServics:SchoolsService) { 

  this.signUpWaysList=[{id:1,name:{ar:this.translate.instant("sign up.phoneNumber"),en:"Phone Number"}},
  {id:2,name:{ar:this.translate.instant("sign up.email"),en:"Email"}},
  {id:3,name:{ar:this.translate.instant("sign up.digitalIdentity"),en:"Digital Identity"}}]
  }
  // login(user: any) {
  //   return this.http.post<{ token: string }>(this.MAIN_LINK, user);
  // }

  

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
      }
      else{
        this.userService.currentUserName.next(res.result.englishName+" "+res.result.englishSurname)
      }

       return res.result.schoolId;
        
    }))
  }
  getSchoolNameRelatedToCurrentEmployee(schoolId)
  {
   
      return this.http.get(`/School/${schoolId}`).pipe(take(1),map((res)=>{
        if(localStorage.getItem('preferredLanguage')=='ar'){
          return res.name.ar;
        }else{
          return res.name.en;
        }
        
        }))
    
    

  }
}
