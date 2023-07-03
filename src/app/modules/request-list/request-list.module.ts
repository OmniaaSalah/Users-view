import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestListRoutingModule } from './request-list-routing.module';
import { PrimngModule } from 'src/app/primng/primeNg.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestdetailsComponent } from './Component/requestdetails/requestdetails.component';
import { RequestChatComponent } from './Component/requestdetails/request-chats/request-chats.component';
import { RequestStatesComponent } from './Component/requestdetails/request-states/request-states.component';
import { CertificatesRequestDetailsComponent } from './Component/requestdetails/certificates-request-details/certificates-request-details.component';

@NgModule({
  declarations: [
    RequestdetailsComponent,
    RequestChatComponent,
    RequestStatesComponent,
    CertificatesRequestDetailsComponent
  ],
  imports: [
    CommonModule,
    RequestListRoutingModule,
    PrimngModule,
    SharedModule,
  ]
})
export class RequestListModule { }
