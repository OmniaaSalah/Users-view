import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolDetailsComponent } from './components/school-details/school-details.component';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolsRoutingModule } from './schools-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';
import { AbsenceRecordsComponent } from './components/absence-records/absence-records.component';




@NgModule({
  declarations: [
    SchoolDetailsComponent,
    SchoolListComponent,
    AbsenceRecordsComponent,
  ],
  imports: [
    CommonModule,
    SchoolsRoutingModule,
    PrimngModule,
    SharedModule,
    NgxPaginationModule,
    TranslateModule
    
  ]
})
export class SchoolsModule { }
