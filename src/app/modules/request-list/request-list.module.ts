import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestListRoutingModule } from './request-list-routing.module';
import { PrimngModule } from 'src/app/primeNg/primeNg.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestdetailsComponent } from './Component/requestdetails/requestdetails.component';
import { RequestChatComponent } from './component/requestdetails/request-chat/request-chat.component';
import { RequestStatesComponent } from './Component/requestdetails/request-states/request-states.component';

@NgModule({
  declarations: [
    RequestdetailsComponent,
    RequestChatComponent,
    RequestStatesComponent
  ],
  imports: [
    CommonModule,
    RequestListRoutingModule,
    PrimngModule,
    SharedModule,
  ]
})
export class RequestListModule { }
