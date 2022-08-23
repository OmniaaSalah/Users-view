import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolDetailsComponent } from './components/school-details/school-details.component';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolsRoutingModule } from './schools-routing.module';



@NgModule({
  declarations: [
    SchoolDetailsComponent,
    SchoolListComponent,
  ],
  imports: [
    CommonModule,
    SchoolsRoutingModule,
    PrimngModule,
    SharedModule
  ]
})
export class SchoolsModule { }
