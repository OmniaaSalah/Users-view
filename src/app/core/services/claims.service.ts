import {  Injectable, OnInit } from '@angular/core';
import { map, take,of} from 'rxjs';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { environment } from 'src/environments/environment';
import { ArrayOperations } from '../classes/array';
import { GenericResponse } from '../models/global/global.model';
import { HttpHandlerService } from './http/http-handler.service';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService implements OnInit {

  userClaims:Partial<{[key in ClaimsEnum]: ClaimsEnum}>

  // http = inject(HttpHandlerService)
  constructor(private http:HttpHandlerService, private userService:UserService) {}
    ngOnInit(): void {
    this.userClaims = this.userService.getClaims()
  }



  getUserClaims(){

    if(Object.keys(this.userClaims).length) return of(this.userClaims)
    // let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append(
    //   'Authorization',
    //   `Bearer ${this.userService.getAccessTokenId()}`
    // );
    return this.http.get(environment.serverUrl+'/current-user/get-claims')
    .pipe(
      map((res: GenericResponse<any>)=> res.result),
      map((res)=> res.map(val => val.code)),
      map((claims:any)=> {
        let claimsMap = ArrayOperations.arrayOfStringsToObject(claims)
        this.userClaims = {...claimsMap}

        // if(this.getCurrentUserScope()==UserScope.SPEA){
        //   this.userClaims = ArrayOperations.arrayOfStringsToObject(this.SpeaClaims)
        // }else if(this.getCurrentUserScope()==UserScope.Employee){
        //   this.userClaims = ArrayOperations.arrayOfStringsToObject(this.EmployeeClaims)
        // }else if (this.getCurrentUserScope()==UserScope.Guardian){
        //   this.userClaims = ArrayOperations.arrayOfStringsToObject(this.GardianClaims)
        // }

        return this.userClaims
      }),
      take(1))
  }


     /**
   * @param  {ClaimsEnum|ClaimsEnum[]} permission
   */
     public isUserAllowedTo(claim) {

      if(!this.userClaims || !Object.keys(this.userClaims ||{})?.length) {
        this.userClaims = this.userService.getClaims() || {}
      }

      if(claim instanceof Array){

        if(!claim.length) return true

        if(claim.some(item=> this.userClaims[item])) return true;

        return false;
      }else{

        if(!claim) return true
         if(this.userClaims[claim]) return true;
         return false;
      }
       // let userClaims = this.getCurrentUserClaims() || [];
       // return userClaims.indexOf(claim) >= 0;
    }


}


