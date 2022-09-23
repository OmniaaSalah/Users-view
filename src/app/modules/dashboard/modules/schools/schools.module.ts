import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolDetailsComponent } from './components/school-details/school-details.component';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolsRoutingModule } from './schools-routing.module';
import { AbsenceRecordsComponent } from './components/absence-records/absence-records.component';
import { SchoolEmployeeComponent } from './components/school-employee/school-employee.component';
import { ChartModule } from 'primeng/chart';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [
    SchoolDetailsComponent,
    SchoolListComponent,
    AbsenceRecordsComponent,
    SchoolEmployeeComponent,
  ],
  imports: [
    CommonModule,
    SchoolsRoutingModule,
    PrimngModule,
    SharedModule,
    ChartModule,
    PanelModule,
    CardModule

  ]
})
export class SchoolsModule { }
