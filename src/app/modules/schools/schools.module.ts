import { PrimngModule } from './../primng/primng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolsRoutingModule } from './schools-routing.module';
import { SchoolsListComponent } from './schools-list/schools-list.component';
import { SchoolDetailsComponent } from './school-details/school-details.component';

import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SchoolsListComponent,
    SchoolDetailsComponent
  ],
  imports: [
    CommonModule,
    SchoolsRoutingModule,
    SharedModule,
    PrimngModule,
    TranslateModule
  ]
})
export class SchoolsModule { }
