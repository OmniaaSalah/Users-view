import { Directive, EventEmitter, HostListener, Input, Output,OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ConfirmModelService } from '../../services/confirm-model/confirm-model.service';

@Directive({
  selector: '[ConfirmDialog]'
})
export class ConfirmDialogDirective implements OnDestroy {
  subscribtion:Subscription;
  @Output() onConfirm = new EventEmitter<void>();
  @Input('ConfirmDialog') modelData ={message: this.translate.instant('shared.confirmDelete'), img:'assets/images/empty-list/basket.svg'};

  constructor(private confirmModelService: ConfirmModelService,private translate:TranslateService) { }

  @HostListener('click') onClick() {
    this.confirmModelService.openModel(this.modelData) ;
      this.confirmListener();

   }



 confirmListener()
 {
    this.confirmModelService.confirmed$.subscribe(val => {
    if (val) this.onConfirm.emit();
  })
 }




 ngOnDestroy(): void {
 this.confirmModelService.confirmed$.next(false)
}


}
