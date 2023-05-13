import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsListRoutingModule } from './notifications-setting-routing.module';
import { NotificationsSettingComponent } from './notifications-setting/notifications-setting.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/primng/primeNg.module';


@NgModule({
  declarations: [
    NotificationsSettingComponent
  ],
  imports: [
    CommonModule,
    NotificationsListRoutingModule,
    SharedModule,
    PrimngModule,
  ]
})
export class NotificationsSettingModule { }
