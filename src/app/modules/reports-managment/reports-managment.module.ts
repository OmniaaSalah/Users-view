import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsManagmentRoutingModule } from './reports-managment-routing.module';
import { StudentsReportsComponent } from './components/students-reports/students-reports.component';
import { DegreesReportsComponent } from './components/degrees-reports/degrees-reports.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/primng/primeNg.module';
import { SubjectsReportsComponent } from './components/subjects-reports/subjects-reports.component';
import { UsersReportsComponent } from './components/users-reports/users-reports.component';
import { AttendanceReportsComponent } from './components/attendance-reports/attendance-reports.component';
import { ParentsReportsComponent } from './components/parents-reports/parents-reports.component';
import { SchoolsReportsComponent } from './components/schools-reports/schools-reports.component';
import { TeachersReportsComponent } from './components/teachers-reports/teachers-reports.component';
import { TransferedStudentsReportsComponent } from './components/transfered-students-reports/transfered-students-reports.component';
import { LocalizeDatePipe } from 'src/app/shared/pipes/localize-date.pipe';


@NgModule({
  declarations: [
    StudentsReportsComponent,
    DegreesReportsComponent,
    SubjectsReportsComponent,
    UsersReportsComponent,
    AttendanceReportsComponent,
    ParentsReportsComponent,
    SchoolsReportsComponent,
    TeachersReportsComponent,
    TransferedStudentsReportsComponent
  ],
  imports: [
    ReportsManagmentRoutingModule,
    SharedModule,
    PrimngModule,
  ],
})
export class ReportsManagmentModule { }
