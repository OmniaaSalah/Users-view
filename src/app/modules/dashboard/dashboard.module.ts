import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { ReportsManagmentModule } from './modules/reports-managment/reports-managment.module';
import { DashboardPanalComponent } from './components/dashboard-panal/dashboard-panal.component';
import { DashboardSharedModule } from './modules/shared/dashboard-shared.module';
import { NotificationsListModule } from './modules/notifications-list/notifications-list.module';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardPanalComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReportsManagmentModule,
    DashboardSharedModule,
    NotificationsListModule,

  ]
})
export class DashboardModule { }
