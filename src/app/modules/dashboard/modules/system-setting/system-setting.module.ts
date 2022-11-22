import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemSettingRoutingModule } from './system-setting-routing.module';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SystemSettingComponent } from './system-setting.component';
import { GracePeriodsListComponent } from './components/grace-periods-list/grace-periods-list.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { GracePeriodComponent } from './components/grace-period/grace-period.component';
import { AttachmentConditionsComponent } from './components/attachment-conditions/attachment-conditions.component';
import { RequiredAttachmentSettingsComponent } from './components/required-attachment-settings/required-attachment-settings.component';
import { SchoolInGracePeriodComponent } from './components/school-in-grace-period/school-in-grace-period.component';

@NgModule({
  declarations: [
    SystemSettingComponent,
    GracePeriodsListComponent,
    NotificationsComponent,
    GracePeriodComponent,
    AttachmentConditionsComponent,
    RequiredAttachmentSettingsComponent,
    SchoolInGracePeriodComponent
  ],
  imports: [
    CommonModule,
    SystemSettingRoutingModule,
    PrimngModule,
    SharedModule,
  ]
})
export class SystemSettingModule { }
