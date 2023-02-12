import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';

const routes: Routes = [
  {path:'', component:NotificationsListComponent,data:{ RouteKey: RouteEnums.Notifications}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsListRoutingModule { }
