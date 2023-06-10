import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimsGuard } from 'src/app/core/guards/claims.guard';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { EditNewSubjectComponent } from '../subjects/components/edit-new-subject/edit-new-subject.component';
import { AnnulHolidayListComponent } from './components/school-details/annul-holiday-list/annul-holiday-list.component';
import { EditListComponent } from './components/school-details/edit-list/edit-list.component';
import { SchoolDetailsComponent } from './components/school-details/school-details.component';
import { DivisionsListComponent } from './components/school-details/divisions-list/divisions-list.component';
import { SchoolEmployeesComponent } from './components/school-details/school-employees/school-employees.component';
import { SchoolGradesComponent } from './components/school-details/grades-list/grades-list.component';
import { SchoolInfoComponent } from './components/school-details/school-info/school-info.component';
import { SchoolSubjectsComponent } from './components/school-details/school-subjects/school-subjects.component';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { TransferGroupComponent } from './components/transfer-group/transfer-group.component';
import { Layout } from 'src/app/layout/layout-routing.service';


const routes: Routes = [
  Layout.childRoutes([

    {
      path: '', component: SchoolListComponent,
      data:{
        RouteKey: RouteEnums.Schools,
        allowedClaims: ClaimsEnum.S_MenuItem_SchoolMenu,
        title:{ar:'المدارس', en:'schools'}
      },
      canActivate: [ClaimsGuard]
    },
    {
      path: 'school/:schoolId/grade/:gradeId', loadChildren: () => import('./components/school-grade-details/school-grade.module').then(m => m.SchoolGradeModule) ,
      data:{title:{ar:'تفاصيل الصف', en:'Grade Details'}}
    },
    {
      path: 'school/:schoolId/division/:divisionId', loadChildren: () => import('./components/school-division-details/school-division.module').then(m => m.SchoolDivisionModule) ,
      data:{title:{ar:'تفاصيل الشعبة', en:'Division Details'}}

    },

    {
      path: 'school/:schoolId',component: SchoolDetailsComponent,
      data:{title:{ar:'تفاصيل المدرسة', en:'School Details'}}
    },



    //NOTE:------ routes for Employee Scope-----------------
    {
      path: ':schoolId',component: SchoolInfoComponent,
      canActivate: [ClaimsGuard],
      data:{
        allowedClaims: ClaimsEnum.E_MenuItem_GeneralInfo,
        data:{title:{ar:'معلومات المدرسة', en:'School Info'}}
      }
    },

    {
      path: ':schoolId/subjects',component: SchoolSubjectsComponent,
      canActivate: [ClaimsGuard],
      data:{
        allowedClaims: ClaimsEnum.E_MenuItem_Subjects,
        data:{title:{ar:'مواد المدرسة', en:'School Details'}}
      }
    },
    {
      path: ':schoolId/subjects/new-subject',component: EditNewSubjectComponent,
      canActivate: [ClaimsGuard],
      data:{
        allowedClaims: ClaimsEnum.E_MenuItem_Subjects,
        title:{ar:'اضافة مادة للمدرسة', en:'Create Subject'}
      }
    },
    {
      path: ':schoolId/subjects/edit-subject/:subjectId',component: EditNewSubjectComponent,
      canActivate: [ClaimsGuard],
      data:{
        allowedClaims: ClaimsEnum.E_MenuItem_Subjects,
        title:{ar:'تعديل مادة المدرسه', en:'Update Subject'}
      }
    },
    {
      path: ':schoolId/annual-holidays',component: AnnulHolidayListComponent,
      canActivate: [ClaimsGuard],
      data:{
        allowedClaims: ClaimsEnum.E_MenuItem_AnnualHolidays,
        title:{ar:'الاجازات السنوية للمدرسة', en:'School Annual Holidays'}
      }
    },
    {
      path: ':schoolId/edit-list',component: EditListComponent,
      canActivate: [ClaimsGuard],
      data:{
        allowedClaims: ClaimsEnum.SE_MenuItem_EditList,
        title:{ar:'التعديلات السابقة (المدرسه)', en:'School Modification History'
      }
      }
    },
    {
      path: ':schoolId/employees',component: SchoolEmployeesComponent,
      canActivate: [ClaimsGuard],
      data:{
        allowedClaims: ClaimsEnum.E_MenuItem_SchoolEmployee,
        title:{ar:'موظفين المدرسة', en:'School Employees'
      }
      }
    },
    {
      path: ':schoolId/transfer-students',component: TransferGroupComponent,
      canActivate: [ClaimsGuard],
      data:{
        allowedClaims: ClaimsEnum.E_TransferStudentGroup,
        title:{ar:'النقل الجماعى', en:'Transfer Student Group'
      }
      }
    },
    {
      path: ':schoolId/grades',component: SchoolGradesComponent,
      canActivate: [ClaimsGuard],
      data:{
        allowedClaims: ClaimsEnum.E_MenuItem_SchoolGrades,
        title:{ar:'صفوف المدرسة', en:'School Grades'}
      }
    },

    {
       path: ':schoolId/grades/grade/:gradeId', loadChildren: () => import('./components/school-grade-details/school-grade.module')
       .then(m => m.SchoolGradeModule),
       data:{title:{ar:'تفاصيل الصف', en:'Garde Details'}}
    },

    {
      path: ':schoolId/divisions',component: DivisionsListComponent,
      canActivate: [ClaimsGuard],
      data:{
        allowedClaims: ClaimsEnum.E_MenuItem_SchoolDivisions,
        title:{ar:'شعب المدرسة', en:'School Divisions'}
      }
    },

    {
      path: ':schoolId/divisions/division/:divisionId', loadChildren: () => import('./components/school-division-details/school-division.module')
      .then(m => m.SchoolDivisionModule),
      data:{title:{ar:'تفاصيل الشعبة', en:'Division Details'}}
    },
  // -------------------------------------------------------------------




    {path: 'transfer-students',
      component: TransferGroupComponent,
      data:{title:{ar:'النقل الجماعى', en:'Transfer Student Group'}}

    },
  ])




];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolsRoutingModule { }
