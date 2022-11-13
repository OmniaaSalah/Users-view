import { Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionsEnum } from '../../enums/permissions/permissions.enum';
import { SharedService } from '../../services/shared/shared.service';

@Directive({
  selector: '[permit]'
})
export class PermissionDirective {

  userClaims = this.sharedService.userClaims

  constructor(
    private sharedService: SharedService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) { }


  @Input()
  set permit(val: PermissionsEnum | PermissionsEnum[]) {
    // IN CASE ARRAY OF PERMISSIONS    
    if (val instanceof Array) {
      
      if(val.some(item=> this.userClaims?.[item])){
          this.viewContainer.createEmbeddedView(this.templateRef);
      }
      else
        this.viewContainer.clear();
    }
    // IN CASE ONE PERMISSION
    else {
      if(this.userClaims?.[val]) {  
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    }

  }

}
