import { NgModule } from '@angular/core';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditNewAssessmentComponent } from './components/edit-new-assessment/edit-new-assessment.component';
import { AssessmentsListComponent } from './components/assessments-list/assessments-list.component';
import { PrimngModule } from 'src/app/primeNg/primeNg.module';

@NgModule({
  declarations: [
    EditNewAssessmentComponent,
    AssessmentsListComponent
  ],
  imports: [
    AssessmentRoutingModule,
    PrimngModule,
    SharedModule,
  ]
})
export class AssessmentModule { }
