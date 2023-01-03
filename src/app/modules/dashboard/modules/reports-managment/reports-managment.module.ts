import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsManagmentRoutingModule } from './reports-managment-routing.module';
import { StudentsReportsComponent } from './components/students-reports/students-reports.component';
import { DegreesReportsComponent } from './components/degrees-reports/degrees-reports.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { TranslateModule } from '@ngx-translate/core';
import { ParentsReportsComponent } from './components/parents-reports/parents-reports.component';
import { SchoolsReportsComponent } from './components/schools-reports/schools-reports.component';
import { TeachersReportsComponent } from './components/teachers-reports/teachers-reports.component';


@NgModule({
  declarations: [
    StudentsReportsComponent,
    DegreesReportsComponent,
    ParentsReportsComponent,
    SchoolsReportsComponent,
    TeachersReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsManagmentRoutingModule,
    SharedModule,
    PrimngModule,
  ]
})
export class ReportsManagmentModule { }
