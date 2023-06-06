import { Directive, Input, OnInit,TemplateRef, ViewContainerRef } from '@angular/core';
import { ClaimsService } from 'src/app/core/services/claims.service';
import { ClaimsEnum } from '../../enums/claims/claims.enum';
import { UserService } from 'src/app/core/services/user/user.service';

@Directive({
  selector: '[permit]'
})
export class PermissionDirective implements OnInit {

  // userClaims = this.claimsService.userClaims
  userClaims = this.userService.getClaims()
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private claimsService:ClaimsService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    // this.userService.getClaims().subscribe(res => this.userClaims = res)

  }

  @Input()
  set permit(claim: ClaimsEnum | ClaimsEnum[]) {;

    if(!claim || !claim.length) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }

    // IN CASE ARRAY OF PERMISSIONS
    if (claim instanceof Array) {

      if(claim.some(item=> this.userClaims?.[item])){
          this.viewContainer.createEmbeddedView(this.templateRef);
      }
      else
        this.viewContainer.clear();
    }
    // IN CASE ONE PERMISSION
    else {
      if(this.userClaims?.[claim]) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    }



  }

}
