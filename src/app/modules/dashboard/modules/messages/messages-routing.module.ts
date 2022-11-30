import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMessageComponent } from './components/add-message/add-message.component';
import { MessageDetailsComponent } from './components/message-details/message-details.component';
import { MessagesMainComponent } from './components/messages-main/messages-main.component';

const routes: Routes = [
  { path: "messages", component: MessagesMainComponent },
  { path: "message-detail/:MessageId", component: MessageDetailsComponent },
  { path: "add-message", component:AddMessageComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
