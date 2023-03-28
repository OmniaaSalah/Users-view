import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CheckSchoolMandatoryMessagesGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,  private toastService: ToastService,private translate:TranslateService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.userService.isSchoolHaveMandatoryMseeages()) {
        this.toastService.warning(this.translate.instant('You have Mandatory Messages , See them first'));
        this.router.navigate(['/']);
        return false;
      }
    return true;
  }

}
