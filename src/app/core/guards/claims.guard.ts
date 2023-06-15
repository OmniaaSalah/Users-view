import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClaimsService } from '../services/claims.service';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimsGuard implements CanActivate {

  constructor(
    private router: Router,
    private claimsService:ClaimsService,
    private userService:UserService
   ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      const allowedClaims = route.data["allowedClaims"];

      let claimFound =this.userService.isUserAllowedTo(allowedClaims)
        if(!claimFound) this.router.navigate(['/oops/page-not-allowed']);

        return claimFound
  }

}
