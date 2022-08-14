import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/auth-guard.service';
import { Layout } from 'src/app/layout/layout-routing.service';
import { SchoolDetailsComponent } from './school-details/school-details.component';
import { SchoolsListComponent } from './schools-list/schools-list.component';

const routes: Routes = [
  Layout.childRoutes([
    { path: '', component: SchoolsListComponent, canActivate: [AuthGuard] },
    { path: 'school/:id', component: SchoolDetailsComponent, canActivate: [AuthGuard] },
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule { }
