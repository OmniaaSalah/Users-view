import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsManagmentRoutingModule } from './reports-managment-routing.module';
import { StudentsReportsComponent } from './components/students-reports/students-reports.component';
import { DegreesReportsComponent } from './components/degrees-reports/degrees-reports.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { TranslateModule } from '@ngx-translate/core';
import { SubjectsReportsComponent } from './components/subjects-reports/subjects-reports/subjects-reports.component';
import { UsersReportsComponent } from './components/users-reports/users-reports/users-reports.component';
import { AttendanceReportsComponent } from './components/attendance-reports/attendance-reports/attendance-reports.component';


@NgModule({
  declarations: [
    StudentsReportsComponent,
    DegreesReportsComponent,
    SubjectsReportsComponent,
    UsersReportsComponent,
    AttendanceReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsManagmentRoutingModule,
    SharedModule,
    PrimngModule,
  ]
})
export class ReportsManagmentModule { }
