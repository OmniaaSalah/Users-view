import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CheeckMandatoryServeyGuard implements CanActivate {
  link=this.translate.instant('shared.gotothem');
  constructor(
    private router: Router,
    private userService: UserService,  private toastService: ToastService,private translate:TranslateService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (this.userService.isUserhaveMandatoryServeies()) {
        this.toastService.error(
          '<a href=\"http://localhost:54799/parent/mandatory-survey\"  class=\"toastr-link\">'+this.link+'</a>',
          this.translate.instant('You have Mandatory Servies , Reply them first'), {
            enableHtml: true,
            timeOut: 10000
        },
        
        );
        this.router.navigate(['/']);
      
        return false;
      }
  }

 
  
}
