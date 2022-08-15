import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolDetailsComponent } from './components/school-details/school-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolsListComponent } from './components/schools-list/schools-list.component';
import { PrimngModule } from '../primng/primng.module';


@NgModule({
  declarations: [
    SchoolsListComponent,
    SchoolDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrimngModule,
  ]
})
export class SchoolsModule { }
