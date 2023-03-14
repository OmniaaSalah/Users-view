import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestListRoutingModule } from './request-list-routing.module';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestdetailsComponent } from './Component/requestdetails/requestdetails.component';

@NgModule({
  declarations: [
    RequestdetailsComponent
  ],
  imports: [
    CommonModule,
    RequestListRoutingModule,
    PrimngModule,
    SharedModule,
  ]
})
export class RequestListModule { }
