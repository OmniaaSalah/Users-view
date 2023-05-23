import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationDetailsComponent } from './component/notification-details/notification-details.component';
import { NotificationListComponent } from './component/notification-list/notification-list.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { Layout } from 'src/app/layout/layout-routing.service';


const routes: Routes = [
  Layout.childRoutes(
    [
      {path:"notifications-list",component:NotificationListComponent},
      {path:"notification-details/:notificationId",component:NotificationDetailsComponent}
    ]
  )



]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
