import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router,
    private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<any> | boolean {
    
    // check authorization
    if (!this.userService.isUserLogged()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
   

    return this.userService.getUserClaims()
    .pipe(map((res)=>{

      if(res) return true
    }))

    // Handle when route claims is empty
    const allowedClaims = route.data["allowedClaims"];
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
