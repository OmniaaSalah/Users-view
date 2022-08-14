import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from 'src/app/layout/layout-routing.service';
import { SchoolDetailsComponent } from './school-details/school-details.component';
import { SchoolsListComponent } from './schools-list/schools-list.component';

const routes: Routes = [

  Layout.childRoutes([
    {
      path: '',
      component: SchoolsListComponent,
    },
    {
      path: 'school/:id',
      component: SchoolDetailsComponent
    },
  ])
  // { path: '', component: SchoolsListComponent },
  // { path: 'school/:id', component: SchoolDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule { }
