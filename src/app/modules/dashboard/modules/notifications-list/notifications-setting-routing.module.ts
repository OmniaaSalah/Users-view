import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { NotificationsSettingComponent } from './notifications-setting/notifications-setting.component';

const routes: Routes = [
  {path:'', component:NotificationsSettingComponent,data:{ RouteKey: RouteEnums.Notifications}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsListRoutingModule { }
