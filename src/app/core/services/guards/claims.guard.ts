import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClaimsService } from '../claims.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimsGuard implements CanActivate {

  constructor(
    private router: Router,
    private claimsService:ClaimsService,
   ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      const allowedClaims = route.data["allowedClaims"];
      let claimFound =this.claimsService.isUserAllowedTo(allowedClaims)
        if(!claimFound) this.router.navigate(['/']);

        return claimFound
  }

}
