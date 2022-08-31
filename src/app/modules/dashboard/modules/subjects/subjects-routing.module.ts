import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSubjectComponent } from './components/new-subject/new-subject.component';
import { SubjectsComponent } from './components/ViewAllSubject/subjects.component';




const routes: Routes = [
  {path:"ViewSubjectList",component:SubjectsComponent},
  
  {path:"AddNewSubject",component:NewSubjectComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
