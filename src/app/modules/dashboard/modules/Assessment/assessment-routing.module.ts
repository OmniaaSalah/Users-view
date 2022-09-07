import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAddNewAssessmentComponent } from './components/edit-add-new-assessment/edit-add-new-assessment.component';
import { ViewAssessmentsListComponent } from './components/view-assessments-list/view-assessments-list.component';

const routes: Routes = [
{path:"View-Assements-List",component:ViewAssessmentsListComponent},
{path:"New-Assessment",component:EditAddNewAssessmentComponent},
{path:"Edit-Assessment/:Ass",component:EditAddNewAssessmentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule { }
