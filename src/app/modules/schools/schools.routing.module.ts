import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from 'src/app/layout/layout-routing.service';
import { SchoolsListComponent } from './components/schools-list/schools-list.component';

const routes: Routes = [
  Layout.childRoutes([
    {
      path: '',
      component: SchoolsListComponent,
    },
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule { }
