import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSubjectComponent } from './components/new-subject/new-subject.component';
import { SubjectsComponent } from './components/subjects-list/subjects-list.component';




const routes: Routes = [
  {path:"subjects-list",component:SubjectsComponent},
  
  {path:"new-subject",component:NewSubjectComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
