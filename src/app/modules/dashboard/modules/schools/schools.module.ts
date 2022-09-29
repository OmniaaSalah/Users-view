import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolDetailsComponent } from './components/school-details/school-details.component';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolsRoutingModule } from './schools-routing.module';
import { AbsenceRecordsComponent } from './components/absence-records/absence-records.component';
import { TransferGroupComponent } from './components/transfer-group/transfer-group.component';
import { DashboardSharedModule } from '../shared/dashboard-shared/dashboard-shared.module';
import { ChartModule } from 'primeng/chart';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import { DivisionStudentsComponent } from './components/school-details/division-students/division-students.component';
import { AbsenceRecordComponent } from './components/school-details/absence-record/absence-record.component';
import { DegreesComponent } from './components/school-details/degrees/degrees.component';

@NgModule({
  declarations: [
    SchoolDetailsComponent,
    SchoolListComponent,
    AbsenceRecordsComponent,
    TransferGroupComponent,
    DivisionStudentsComponent,
    AbsenceRecordComponent,
    DegreesComponent,
  ],
  imports: [
    CommonModule,
    SchoolsRoutingModule,
    PrimngModule,
    SharedModule,
    ChartModule,
    PanelModule,
    CardModule,
    DashboardSharedModule
  ]
})
export class SchoolsModule { }
