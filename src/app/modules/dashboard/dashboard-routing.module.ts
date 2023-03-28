import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimsGuard } from 'src/app/core/services/guards/claims.guard';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    children: [

      {
        path: 'schools-and-students/schools',
        loadChildren: () => import('./modules/schools/schools.module').then(m => m.SchoolsModule),
        canActivate: [ClaimsGuard],
        data:{allowedClaims: ClaimsEnum.S_Menu_SchoolsAndStudents}
      },
      {
        path: 'school-management/school',
        loadChildren: () => import('./modules/schools/schools.module').then(m => m.SchoolsModule),
        canActivate: [ClaimsGuard],
        data:{allowedClaims: [ClaimsEnum.E_Menu_ManageSchool, , ClaimsEnum.E_MenuItem_Subjects]}
      },

      {
        path: 'school-management/requests-list',
        loadChildren: () => import('./modules/request-list/request-list.module').then(m => m.RequestListModule),
        canActivate: [ClaimsGuard],
        // data:{allowedClaims: ClaimsEnum.E_MenuItem_Requests}
      },

      {
        path: 'schoolEmployee-management/school',
        loadChildren: () => import('./modules/schools/schools.module').then(m => m.SchoolsModule),
        canActivate: [ClaimsGuard],
        data:{allowedClaims: ClaimsEnum.E_menu_ManageSchoolEmployee}
      },
      {
        path: 'grades-and-divisions/school',
        loadChildren: () => import('./modules/schools/schools.module').then(m => m.SchoolsModule),
        canActivate: [ClaimsGuard],
        data:{allowedClaims: ClaimsEnum.E_Menu_ManageGradesAndDivisions}
      },

      //NOTE:- Parents routes for Different users----------------------------------------
      {
        path: 'schools-and-students/all-parents',
        loadChildren: () => import('./modules/parants/parents.module').then(m => m.ParantsModule),
        canActivate: [ClaimsGuard],
        data:{allowedClaims: ClaimsEnum.S_Menu_SchoolsAndStudents}
      },
      {
        path: 'student-management/all-parents',
        loadChildren: () => import('./modules/parants/parents.module').then(m => m.ParantsModule),
        canActivate: [ClaimsGuard],
        data:{allowedClaims: ClaimsEnum.E_menu_ManageStudents}
      },

      //NOTE:- Students routes for Different users----------------------------------------

      {
        path: 'schools-and-students/students',
        loadChildren: () => import('./modules/students/students.module').then(m => m.StudentsModule),
        canActivate: [ClaimsGuard],
        data:{allowedClaims: ClaimsEnum.S_Menu_SchoolsAndStudents}
      },
      {
        path: 'student-management/students',
        loadChildren: () => import('./modules/students/students.module').then(m => m.StudentsModule),
        canActivate: [ClaimsGuard],
        data:{allowedClaims: [ClaimsEnum.E_menu_ManageStudents]}
      },



      {
        path: 'educational-settings/surveys',
        loadChildren: () => import('./modules/surveys/surveys.module').then(m => m.SurveysModule),
        canActivate: [ClaimsGuard],
        // data:{allowedClaims: ClaimsEnum.S_MenuItem_Survey}
      },


        {
          path: 'educational-settings/annual-holiday',
          loadChildren: () => import('./modules/annual-holiday/annual-holiday.module').then(m => m.AnnualHolidayModule),
          canActivate: [ClaimsGuard],
          data:{allowedClaims: ClaimsEnum.S_MenuItem_Holiday}
        },
        {
          path: 'school-performance-managent/assessments',
          loadChildren: () => import('./modules/assessment/assessment.module').then(m => m.AssessmentModule),
          canActivate: [ClaimsGuard],
          data:{allowedClaims: ClaimsEnum.SE_MenuItem_Exam}
        },
        {
          path: 'educational-settings/assessments',
          loadChildren: () => import('./modules/assessment/assessment.module').then(m => m.AssessmentModule),
          canActivate: [ClaimsGuard],
          data:{allowedClaims: ClaimsEnum.SE_MenuItem_Rate}
        },
        {
          path: 'educational-settings/school-year',
          loadChildren: () => import('./modules/school-years/school-years.module').then(m => m.SchoolYearsModule),
          canActivate: [ClaimsGuard],
          data:{allowedClaims: ClaimsEnum.S_MenuItem_SchoolYear}
        },

        {
          path: 'educational-settings/subject',
          loadChildren: () => import('./modules/subjects/subjects.module').then(m => m.SubjectsModule),
          canActivate: [ClaimsGuard],
          data:{allowedClaims: ClaimsEnum.S_MenuItem_SubjectMenu}
        },

      {
        path: 'manager-tools/user-roles',
        loadChildren: () => import('./modules/user-roles/user-roles.module').then(m => m.UserRolesModule),
        canActivate: [ClaimsGuard],
        data:{allowedClaims: ClaimsEnum.S_MenuItem_Role}
      },
      {
        path: 'manager-tools/indexes',
        loadChildren: () => import('./modules/indexes/indexes.module').then(m => m.IndexesModule),
        canActivate: [ClaimsGuard],
        data:{allowedClaims: ClaimsEnum.S_MenuItem_Index}
      },
      {
        path: 'manager-tools/settings',
        loadChildren: () => import('./modules/system-setting/system-setting.module').then(m => m.SystemSettingModule),
        canActivate: [ClaimsGuard],
        data:{allowedClaims: ClaimsEnum.S_MenuItem_Setting}
      },
      {
        path: 'manager-tools/user-information',
        loadChildren: () => import('./modules/user-information/user-information.module').then(m => m.UserInformationModule),
        canActivate: [ClaimsGuard],
        data:{allowedClaims: ClaimsEnum.S_MenuItem_user}
      },
      {
        path: 'manager-tools/notifications',
        loadChildren: () => import('./modules/notifications-list/notifications-list.module').then(m => m.NotificationsListModule),
        canActivate: [ClaimsGuard],
        data:{allowedClaims: ClaimsEnum.S_MenuItem_Setting}
      },



      {
        path: 'performance-managment/assignments',
        loadChildren: () => import('./modules/assignments/assignments.module').then(m => m.AssignmentsModule),
        canActivate: [ClaimsGuard],
        data:{allowedClaims: ClaimsEnum.S_MenuItem_Setting}
      },
      {
        path: 'school-performance-managent/assignments',
        loadChildren: () => import('./modules/assignments/assignments.module').then(m => m.AssignmentsModule),
        canActivate: [ClaimsGuard],
        data:{allowedClaims: ClaimsEnum.SE_MenuItem_Exam}
      },

      {
        path: 'performance-managment/RequestList',
        loadChildren: () => import('./modules/request-list/request-list.module').then(m => m.RequestListModule),
        canActivate: [ClaimsGuard],
        // data:{allowedClaims: ClaimsEnum.S_MenuItem_Request}
      },


      {
        path: 'reports-managment',
        loadChildren: () => import('./modules/reports-managment/reports-managment.module').then(m => m.ReportsManagmentModule),
        canActivate: [ClaimsGuard],
        data:{allowedClaims: ClaimsEnum.S_Menu_ReportsManagement}
      },

      {
        path: 'messages',
        loadChildren: () => import('./modules/messages/messages.module').then(m =>m.MessagesModule),
      }


    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
