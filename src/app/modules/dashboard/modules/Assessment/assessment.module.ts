import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentRoutingModule } from './assessment-routing.module';
import { EditAddNewAssessmentComponent } from './components/edit-add-new-assessment/edit-add-new-assessment.component';
import { ViewAssessmentsListComponent } from './components/view-assessments-list/view-assessments-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { PrimngModule } from '../../../primng/primng.module';

@NgModule({
  declarations: [
    EditAddNewAssessmentComponent,
    ViewAssessmentsListComponent
  ],
  imports: [
    CommonModule,
    AssessmentRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxPaginationModule,
    PrimngModule,
   TranslateModule,
    SharedModule,
    ToastrModule
    
  ]
})
export class AssessmentModule { }
