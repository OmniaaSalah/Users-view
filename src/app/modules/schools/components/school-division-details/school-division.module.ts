import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolDivisionRoutingModule } from './school-division-routing.module';
import { DivisionStudentsComponent } from './division-students/division-students.component';
import { AbsenceRecordComponent } from './absence-record/absence-record.component';
import { DegreesComponent } from './degrees/degrees.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/primng/primeNg.module';
import { SchoolDivisionComponent } from './school-division.component';
import { StudentsRateComponent } from './students-rate/students-rate.component';
import { SubjectDegreesComponent } from './subject-degrees/subject-degrees.component';
import { DivisionSubjectsComponent } from './division-subjects/division-subjects.component';
import { FeaturesSharedModule } from 'src/app/modules/shared/features-shared.module';


@NgModule({
  declarations: [
    SchoolDivisionComponent,
    DivisionStudentsComponent,
    AbsenceRecordComponent,
    DegreesComponent,
    DivisionSubjectsComponent,
    StudentsRateComponent,
    SubjectDegreesComponent,],
  imports: [
    CommonModule,
    SchoolDivisionRoutingModule,
    SharedModule,
    PrimngModule,
    FeaturesSharedModule
  ],
  entryComponents:[SubjectDegreesComponent]
})
export class SchoolDivisionModule { }
