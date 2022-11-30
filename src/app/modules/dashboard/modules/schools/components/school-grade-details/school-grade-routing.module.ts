import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolGradeComponent } from './school-grade.component';

const routes: Routes = [{ path: '', component: SchoolGradeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolGradeRoutingModule { }
