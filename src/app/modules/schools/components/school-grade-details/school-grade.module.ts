import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolGradeRoutingModule } from './school-grade-routing.module';
import { SchoolGradeComponent } from './school-grade.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/primng/primeNg.module';
import { ClassScheduleComponent } from './class-schedule/class-schedule.component';
import { GardeStudentsComponent } from './garde-students/garde-students.component';
import { FeaturesSharedModule } from 'src/app/modules/shared/Features-shared.module';


@NgModule({
  declarations: [
    SchoolGradeComponent,
    ClassScheduleComponent,
    GardeStudentsComponent,
  ],
  imports: [
    CommonModule,
    SchoolGradeRoutingModule,
    SharedModule,
    PrimngModule,
    FeaturesSharedModule
  ]
})
export class SchoolGradeModule {

}
