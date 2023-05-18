import { Directive, Input, OnInit,TemplateRef, ViewContainerRef } from '@angular/core';
import { ClaimsService } from 'src/app/core/services/claims.service';
import { ClaimsEnum } from '../../enums/claims/claims.enum';

@Directive({
  selector: '[permit]'
})
export class PermissionDirective implements OnInit {

  userClaims = this.claimsService.userClaims

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private claimsService:ClaimsService,
  ) { }

  ngOnInit(): void {
    // this.userService.getUserClaims().subscribe(res => this.userClaims = res)
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
