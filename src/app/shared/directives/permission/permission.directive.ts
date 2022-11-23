import { Directive, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from '../../enums/permissions/permissions.enum';
import { SharedService } from '../../services/shared/shared.service';

@Directive({
  selector: '[permit]'
})
export class PermissionDirective implements OnInit {

  userClaims = this.userService.userClaims

  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) { }

  ngOnInit(): void {
    // this.userService.getUserClaims().subscribe(res => this.userClaims = res)
  }

  @Input()
  set permit(claim: ClaimsEnum | ClaimsEnum[]) {
    
    // this.userClaims = res
    // IN CASE ARRAY OF PERMISSIONS    
    if (claim instanceof Array) {
      
      if(claim.some(item=> this.userClaims?.[item])){
        console.log(claim);
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
