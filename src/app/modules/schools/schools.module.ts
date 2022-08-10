import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolsRoutingModule } from './schools-routing.module';
import { SchoolsListComponent } from './schools-list/schools-list.component';
import { SchoolDetailsComponent } from './school-details/school-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from '../primng/primng.module';

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
