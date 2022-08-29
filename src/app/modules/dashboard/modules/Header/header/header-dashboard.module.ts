import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';



import { ToastrModule } from 'ngx-toastr';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderDashboardComponent } from './header-dashboard/header-dashboard.component';



@NgModule({
  declarations: [HeaderDashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    PrimngModule,
    TranslateModule,
    SharedModule,
    ToastrModule,

   
  ],
  exports: [HeaderDashboardComponent]
})
export class HeaderModule { }
