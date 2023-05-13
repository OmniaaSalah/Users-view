import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesMainComponent } from './components/messages-main/messages-main.component';
import { MessageDetailsComponent } from './components/message-details/message-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/primng/primeNg.module';
import { AddMessageComponent } from './components/add-message/add-message.component';


@NgModule({
  declarations: [
    MessagesMainComponent,
    MessageDetailsComponent,
    AddMessageComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    PrimngModule,
    SharedModule
  ]
})
export class MessagesModule { }
