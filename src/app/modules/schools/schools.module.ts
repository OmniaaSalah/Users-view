import { PrimngModule } from './../primng/primng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolDetailsComponent } from './components/school-details/school-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolsListComponent } from './components/schools-list/schools-list.component';
import { SchoolsRoutingModule } from '../dashboard/components/schools/schools-routing.module';

@NgModule({
  declarations: [
    SchoolsListComponent,
    SchoolDetailsComponent
  ],
  imports: [
    CommonModule,
    SchoolsRoutingModule,
    SharedModule,
    PrimngModule
  ]
})
export class SchoolsModule { }
