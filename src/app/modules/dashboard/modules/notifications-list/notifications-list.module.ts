import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsListRoutingModule } from './notifications-list-routing.module';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/modules/primng/primng.module';


@NgModule({
  declarations: [
    NotificationsListComponent
  ],
  imports: [
    CommonModule,
    NotificationsListRoutingModule,
    SharedModule,
    PrimngModule,
  ]
})
export class NotificationsListModule { }
