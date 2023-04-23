import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CheeckMandatoryServeyGuard implements CanActivate ,OnDestroy{
  link=this.translate.instant('shared.gotothem');
  subscription:Subscription;
  constructor(
    public confirmModelService: ConfirmModelService,
    private router: Router,
    private userService: UserService,  private toastService: ToastService,private translate:TranslateService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.userService.isUserhaveMandatoryServeies()) {
        this.confirmDeleteListener();
        this.confirmModelService.openModel({message:this.translate.instant('You have Mandatory Servies , Reply them first'),img:'assets/images/shared/file.svg'})
        this.router.navigate(['/']);

        return false;
      }

  }

  confirmDeleteListener(){
    this.subscription=this.confirmModelService.confirmed$.subscribe(val => {
      if (val) this.router.navigate(['/parent/mandatory-survey']);

    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
