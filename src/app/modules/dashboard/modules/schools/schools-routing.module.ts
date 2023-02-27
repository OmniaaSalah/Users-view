import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimsGuard } from 'src/app/core/services/guards/claims.guard';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { EditNewSubjectComponent } from '../subjects/components/edit-new-subject/edit-new-subject.component';
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
    path: '', component: SchoolListComponent, 
    data:{ RouteKey: RouteEnums.Schools,allowedClaims: ClaimsEnum.S_MenuItem_SchoolMenu},
    canActivate: [ClaimsGuard]
  },
  { path: 'school/:schoolId/grade/:gradeId', loadChildren: () => import('./components/school-grade-details/school-grade.module').then(m => m.SchoolGradeModule) },
  { path: 'school/:schoolId/division/:divisionId', loadChildren: () => import('./components/school-division-details/school-division.module').then(m => m.SchoolDivisionModule) },

  {path: 'school/:schoolId',component: SchoolDetailsComponent},



  //NOTE:------ routes for Employee Scope-----------------
  {
    path: ':schoolId',component: SchoolInfoComponent,
    canActivate: [ClaimsGuard],
    data:{allowedClaims: ClaimsEnum.E_MenuItem_GeneralInfo}
  },

  {
    path: ':schoolId/subjects',component: SchoolSubjectsComponent,
    canActivate: [ClaimsGuard],
    data:{allowedClaims: ClaimsEnum.E_MenuItem_Subjects}
  },
  {
    path: ':schoolId/subjects/new-subject',component: EditNewSubjectComponent,
    canActivate: [ClaimsGuard],
    data:{allowedClaims: ClaimsEnum.S_MenuItem_SchoolMenu}
  },
  {
    path: ':schoolId/annual-holidays',component: AnnulHolidayListComponent,
    canActivate: [ClaimsGuard],
    data:{allowedClaims: ClaimsEnum.E_MenuItem_AnnualHolidays}
  },
  {
    path: ':schoolId/edit-list',component: EditListComponent,
    canActivate: [ClaimsGuard],
    data:{allowedClaims: ClaimsEnum.E_MenuItem_EditList}
  },
  {
    path: ':schoolId/employees',component: SchoolEmployeesComponent,
    canActivate: [ClaimsGuard],
    data:{allowedClaims: ClaimsEnum.E_MenuItem_SchoolEmployee}
  },
  {
    path: ':schoolId/transfer-students',component: TransferGroupComponent,
    canActivate: [ClaimsGuard],
    data:{allowedClaims: ClaimsEnum.E_TransferStudentGroup}
  },
  {
    path: ':schoolId/grades',component: SchoolGradesComponent,
    canActivate: [ClaimsGuard],
    data:{allowedClaims: ClaimsEnum.E_MenuItem_SchoolGrades}
  },
  {
     path: ':schoolId/grades/grade/:gradeId', loadChildren: () => import('./components/school-grade-details/school-grade.module').then(m => m.SchoolGradeModule) },

  {
    path: ':schoolId/divisions',component: SchoolDivisionsComponent,
    canActivate: [ClaimsGuard],
    data:{allowedClaims: ClaimsEnum.E_MenuItem_SchoolDivisions}
  },
    
  {
    path: ':schoolId/divisions/division/:divisionId', loadChildren: () => import('./components/school-division-details/school-division.module').then(m => m.SchoolDivisionModule) },
// -------------------------------------------------------------------




{path: 'transfer-students',component: TransferGroupComponent},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule { }
