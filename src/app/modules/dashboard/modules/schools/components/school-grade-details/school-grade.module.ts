import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolGradeRoutingModule } from './school-grade-routing.module';
import { SchoolGradeComponent } from './school-grade.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/shared/primng/shared-primng.module';
import { ClassScheduleComponent } from './class-schedule/class-schedule.component';
import { GardeStudentsComponent } from './garde-students/garde-students.component';


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
  ]
})
export class SchoolGradeModule {

}
