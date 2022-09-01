import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeletedStudentComponent } from './components/deleted-student/deleted-student.component';
import { StudentsListComponent } from './components/students-list/students-list.component';

const routes: Routes = [
  { path: "", component: StudentsListComponent },
  { path: "student/:id", component: DeletedStudentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
