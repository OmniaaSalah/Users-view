import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { AssignmentsListComponent } from './assignments/assignments-list/assignments-list.component';
import { UploadAssignmentComponent } from './assignments/upload-assignment/upload-assignment.component';




const routes: Routes = [
  { path: 'assignments-list', component: AssignmentsListComponent ,data:{ RouteKey: RouteEnums.Exams}},
  { path: 'upload-assignment', component: UploadAssignmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentRoutingModule { }
