import { Directive, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from '../../enums/claims/claims.enum';
import { SharedService } from '../../services/shared/shared.service';

@Directive({
  selector: '[permit]'
})
export class PermissionDirective implements OnInit {

  userClaims = this.coreService.userClaims

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private coreService:CoreService,
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
