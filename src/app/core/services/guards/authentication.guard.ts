import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { RouteListenrService } from 'src/app/shared/services/route-listenr/route-listenr.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { ClaimsService } from '../claims.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private coreSercice:ClaimsService,) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<any> | boolean {
        
    // check authorization
    if (!this.userService.isUserLogged()) {
      this.router.navigate(['/auth/login'],{ queryParams: { returnUrl: state.url }});
      return false;
    }
   



    return this.coreSercice.getUserClaims()
    .pipe(map((res)=>{
        if(res)  return true
       
    }))




    const allowedClaims = route.data["allowedClaims"];

    // Handle when route claims is empty
    if (!allowedClaims || allowedClaims.length == 0)
      return true;

    // Handle when user claims is empty
    const userClaims = this.userService.getCurrentUserClaims();
    if (!userClaims || userClaims.length == 0) {
      this.router.navigate(['/oops/not-authorized']);
      return false;
    }

    // Finally check if claim is allowed
    let claimFound = allowedClaims.some((claim: any) => {
      return userClaims.findIndex((uclaim: any) => uclaim == claim) >= 0;
    })


    if (!claimFound)
      this.router.navigate(['/oops/not-authorized']);

    // return claimFound;
  }


}
