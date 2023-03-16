import {  Injectable } from '@angular/core';
import { map, take} from 'rxjs';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { environment } from 'src/environments/environment';
import { ArrayOperations } from '../classes/array';
import { GenericResponse } from '../models/global/global.model';
import { HttpHandlerService } from './http/http-handler.service';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  // http = inject(HttpHandlerService)
  constructor(private http:HttpHandlerService, private sharedService:SharedService
    ) { }

  userClaims:Partial<{[key in ClaimsEnum]: ClaimsEnum}>={}
  

  getUserClaims(){
    
    // if(Object.keys(this.userClaims).length) return of(this.userClaims)
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


