import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnulHolidayListComponent } from './components/school-details/annul-holiday-list/annul-holiday-list.component';
import { EditListComponent } from './components/school-details/edit-list/edit-list.component';
import { SchoolDetailsComponent } from './components/school-details/school-details.component';
import { SchoolDivisionsComponent } from './components/school-details/school-divisions/school-divisions.component';
import { SchoolEmployeesComponent } from './components/school-details/school-employees/school-employees.component';
import { SchoolGradesComponent } from './components/school-details/school-grades/school-grades.component';
import { SchoolInfoComponent } from './components/school-details/school-info/school-info.component';
import { SchoolSubjectsComponent } from './components/school-details/school-subjects/school-subjects.component';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { TransferGroupComponent } from './components/transfer-group/transfer-group.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolListComponent,
  },
  {path: 'school/:schoolId',component: SchoolDetailsComponent,},

  // routes for Employee Scoop
  {path: ':schoolId',component: SchoolInfoComponent,},
  {path: ':schoolId/subjects',component: SchoolSubjectsComponent},
  {path: ':schoolId/annual-holidays',component: AnnulHolidayListComponent},
  {path: ':schoolId/edit-list',component: EditListComponent},
  {path: ':schoolId/employees',component: SchoolEmployeesComponent},
  {path: ':schoolId/grades',component: SchoolGradesComponent},
  { path: ':schoolId/grades/grade/:gradeId', loadChildren: () => import('./components/school-class/school-class.module').then(m => m.SchoolClassModule) },

  {path: ':schoolId/divisions',component: SchoolDivisionsComponent},
  { path: ':schoolId/divisions/division/:divisionId', loadChildren: () => import('./components/school-division/school-division.module').then(m => m.SchoolDivisionModule) },
// -------------------------------------------------------------------


{ path: 'school/:schoolId/grade/:gradeId', loadChildren: () => import('./components/school-class/school-class.module').then(m => m.SchoolClassModule) },

{ path: 'school/:schoolId/division/:divisionId', loadChildren: () => import('./components/school-division/school-division.module').then(m => m.SchoolDivisionModule) },

{path: 'transfer-students',component: TransferGroupComponent},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule { }
