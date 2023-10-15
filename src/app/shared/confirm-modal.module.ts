import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModelComponent } from './components/confirm-model/confirm-model.component';
import { ConfirmDialogDirective } from './directives/confirm-dialog/confirm-dialog.directive';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmModelService } from './services/confirm-model/confirm-model.service';



@NgModule({
  declarations: [ConfirmModelComponent, ConfirmDialogDirective],
  imports: [
    CommonModule,
    DialogModule,
    TranslateModule
  ],
  exports:[ConfirmDialogDirective,ConfirmModelComponent],
  providers:[]
})
export class ConfirmModalModule { }
