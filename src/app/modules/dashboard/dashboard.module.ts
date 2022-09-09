import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SurveysModule } from './modules/surveys/surveys.module';
import { ReportsManagmentModule } from './modules/reports-managment/reports-managment.module';







@NgModule({
  declarations: [
    DashboardComponent
   
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReportsManagmentModule,
  ]
})
export class DashboardModule { }
