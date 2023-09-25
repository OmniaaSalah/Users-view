import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolDetailsComponent } from './components/school-details/school-details.component';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { PrimngModule } from 'src/app/primng/primeNg.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolsRoutingModule } from './schools-routing.module';
import { TransferGroupComponent } from './components/transfer-group/transfer-group.component';
import { ChartModule } from 'primeng/chart';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import { QrCodeModule } from 'ng-qrcode';
import { EditListComponent } from './components/school-details/edit-list/edit-list.component';
import { SchoolSubjectsComponent } from './components/school-details/school-subjects/school-subjects.component';
import { AnnulHolidayListComponent } from './components/school-details/annul-holiday-list/annul-holiday-list.component';
import { SchoolEmployeesComponent } from './components/school-details/school-employees/school-employees.component';
import { DivisionsListComponent } from './components/school-details/divisions-list/divisions-list.component';
import { SchoolGradesComponent } from './components/school-details/grades-list/grades-list.component';
import { NgChartsModule } from 'ng2-charts';
import { SchoolChartsComponent } from './components/school-list/school-charts/school-charts.component';
import { SchoolInfoComponent } from './components/school-details/school-info/school-info.component';
import { SchoolLocationComponent } from './components/school-details/school-location/school-location.component';
@NgModule({
  declarations: [
    SchoolDetailsComponent,
    SchoolListComponent,
    TransferGroupComponent,
    EditListComponent,
    SchoolSubjectsComponent,
    AnnulHolidayListComponent,
    SchoolEmployeesComponent,
    DivisionsListComponent,
    SchoolGradesComponent,
    SchoolChartsComponent,
    SchoolInfoComponent,
    SchoolLocationComponent,
  ],
  imports: [
    CommonModule,
    SchoolsRoutingModule,
    PrimngModule,
    SharedModule,
    ChartModule,
    PanelModule,
    CardModule,
    NgChartsModule,
    QrCodeModule
  ]
})
export class SchoolsModule { }
