import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimsGuard } from 'src/app/core/guards/claims.guard';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    children: [

      // {
      //   path: 'schools-and-students/schools',
      //   loadChildren: () => import('./schools/schools.module').then(m => m.SchoolsModule),
      //   canActivate: [ClaimsGuard],
      //   data:{allowedClaims: ClaimsEnum.S_Menu_SchoolsAndStudents}
      // },
      // {
      //   path: 'school-management/school',
      //   loadChildren: () => import('./schools/schools.module').then(m => m.SchoolsModule),
      //   canActivate: [ClaimsGuard],
      //   data:{allowedClaims: [ClaimsEnum.E_Menu_ManageSchool, , ClaimsEnum.E_MenuItem_Subjects]}
      // },

      // {
      //   path: 'school-management/requests-list',
      //   loadChildren: () => import('./request-list/request-list.module').then(m => m.RequestListModule),
      //   canActivate: [ClaimsGuard],
      //   // data:{allowedClaims: ClaimsEnum.E_MenuItem_Requests}
      // },

      // {
      //   path: 'schoolEmployee-management/school',
      //   loadChildren: () => import('./schools/schools.module').then(m => m.SchoolsModule),
      //   canActivate: [ClaimsGuard],
      //   data:{allowedClaims: ClaimsEnum.E_menu_ManageSchoolEmployee}
      // },
      // {
      //   path: 'grades-and-divisions/school',
      //   loadChildren: () => import('./schools/schools.module').then(m => m.SchoolsModule),
      //   canActivate: [ClaimsGuard],
      //   data:{allowedClaims: ClaimsEnum.E_Menu_ManageGradesAndDivisions}
      // },

      //NOTE:- Parents routes for Different users----------------------------------------
      // {
      //   path: 'schools-and-students/all-parents',
      //   loadChildren: () => import('./parants/parents.module').then(m => m.ParantsModule),
      //   canActivate: [ClaimsGuard],
      //   data:{allowedClaims: ClaimsEnum.S_Menu_SchoolsAndStudents}
      // },
      // {
      //   path: 'student-management/all-parents',
      //   loadChildren: () => import('./parants/parents.module').then(m => m.ParantsModule),
      //   canActivate: [ClaimsGuard],
      //   data:{allowedClaims: ClaimsEnum.E_menu_ManageStudents}
      // },

      //NOTE:- Students routes for Different users----------------------------------------

      // {
      //   path: 'schools-and-students/students',
      //   loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),
      //   canActivate: [ClaimsGuard],
      //   data:{allowedClaims: ClaimsEnum.S_Menu_SchoolsAndStudents}
      // },
      // {
      //   path: 'student-management/students',
      //   loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),
      //   canActivate: [ClaimsGuard],
      //   data:{allowedClaims: [ClaimsEnum.E_menu_ManageStudents]}
      // },



      // {
      //   path: 'educational-settings/surveys',
      //   loadChildren: () => import('./surveys/surveys.module').then(m => m.SurveysModule),
      //   canActivate: [ClaimsGuard],
      //   // data:{allowedClaims: ClaimsEnum.S_MenuItem_Survey}
      // },


      //   {
      //     path: 'educational-settings/annual-holiday',
      //     loadChildren: () => import('./annual-holiday/annual-holiday.module').then(m => m.AnnualHolidayModule),
      //     canActivate: [ClaimsGuard],
      //     data:{allowedClaims: ClaimsEnum.S_MenuItem_Holiday}
      //   },

      //   {
      //     path: 'educational-settings/assessments',
      //     loadChildren: () => import('./assessment/assessment.module').then(m => m.AssessmentModule),
      //     canActivate: [ClaimsGuard],
      //     data:{allowedClaims: ClaimsEnum.SE_MenuItem_Rate}
      //   },
      //   {
      //     path: 'educational-settings/school-year',
      //     loadChildren: () => import('./school-years/school-years.module').then(m => m.SchoolYearsModule),
      //     canActivate: [ClaimsGuard],
      //     data:{allowedClaims: ClaimsEnum.S_MenuItem_SchoolYear}
      //   },

      //   {
      //     path: 'educational-settings/subject',
      //     loadChildren: () => import('./subjects/subjects.module').then(m => m.SubjectsModule),
      //     canActivate: [ClaimsGuard],
      //     data:{allowedClaims: ClaimsEnum.S_MenuItem_SubjectMenu}
      //   },



      // {
      //   path: 'manager-tools/user-roles',
      //   loadChildren: () => import('./user-roles/user-roles.module').then(m => m.UserRolesModule),
      //   canActivate: [ClaimsGuard],
      //   data:{allowedClaims: ClaimsEnum.S_MenuItem_Role}
      // },
      // {
      //   path: 'manager-tools/indexes',
      //   loadChildren: () => import('./indexes/indexes.module').then(m => m.IndexesModule),
      //   canActivate: [ClaimsGuard],
      //   data:{allowedClaims: ClaimsEnum.S_MenuItem_Index}
      // },
      // {
      //   path: 'manager-tools/settings',
      //   loadChildren: () => import('./system-setting/system-setting.module').then(m => m.SystemSettingModule),
      //   canActivate: [ClaimsGuard],
      //   data:{allowedClaims: ClaimsEnum.S_MenuItem_Setting}
      // },
      // {
      //   path: 'manager-tools/user-information',
      //   loadChildren: () => import('./user-information/user-information.module').then(m => m.UserInformationModule),
      //   canActivate: [ClaimsGuard],
      //   data:{allowedClaims: ClaimsEnum.S_MenuItem_user}
      // },
      // {
      //   path: 'manager-tools/notifications',
      //   loadChildren: () => import('./notifications-list/notifications-setting.module').then(m => m.NotificationsSettingModule),
      //   canActivate: [ClaimsGuard],
      //   data:{allowedClaims: ClaimsEnum.S_MenuItem_Setting}
      // },


      // {
      //   path: 'school-performance-managent/assignments',
      //   loadChildren: () => import('./assignments/assignments.module').then(m => m.AssignmentsModule),
      //   canActivate: [ClaimsGuard],
      //   data:{allowedClaims: ClaimsEnum.SE_MenuItem_Exam}
      // },
      // {
      //   path: 'school-performance-managent/assessments',
      //   loadChildren: () => import('./assessment/assessment.module').then(m => m.AssessmentModule),
      //   canActivate: [ClaimsGuard],
      //   data:{allowedClaims: ClaimsEnum.SE_MenuItem_Exam}
      // },


      // {
      //   path: 'performance-managment/assignments',
      //   loadChildren: () => import('./assignments/assignments.module').then(m => m.AssignmentsModule),
      //   canActivate: [ClaimsGuard],
      //   data:{allowedClaims: ClaimsEnum.S_MenuItem_Setting}
      // },


      // {
      //   path: 'performance-managment/RequestList',
      //   loadChildren: () => import('./request-list/request-list.module').then(m => m.RequestListModule),
      //   canActivate: [ClaimsGuard],
      //   // data:{allowedClaims: ClaimsEnum.S_MenuItem_Request}
      // },


      // {
      //   path: 'reports-managment',
      //   loadChildren: () => import('./reports-managment/reports-managment.module').then(m => m.ReportsManagmentModule),
      //   canActivate: [ClaimsGuard],
      //   data:{allowedClaims: ClaimsEnum.S_Menu_ReportsManagement}
      // },

      // {
      //   path: 'messages',
      //   loadChildren: () => import('./messages/messages.module').then(m =>m.MessagesModule),
      // }


    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
