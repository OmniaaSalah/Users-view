import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationDetailsComponent } from './component/notification-details/notification-details.component';
import { ViewNotificationListComponent } from './component/view-notification-list/view-notification-list.component';

const routes: Routes = [
  {path:"View-All-Notifications",component:ViewNotificationListComponent},

  {path:"Notification-Details/:NID",component:NotificationDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
