import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { CheckSchoolMandatoryMessagesGuard } from './core/guards/check-school-mandatory-messages.guard';
import { CertificateDetailsComponent } from './modules/issuance-of-a-certificate-pages/components/certificate-details/certificate-details.component';
import { HomeComponent } from './core/home-page/home.component';
import { ClaimsGuard } from './core/guards/claims.guard';
import { ClaimsEnum } from './shared/enums/claims/claims.enum';
import { CheeckMandatoryServeyGuard } from './core/guards/check-mandatory-servey.guard';
import { NotAllowedComponent } from './core/components/not-allowed/not-allowed.component';
import { Layout } from './layout/layout-routing.service';

const routes: Routes = [

  {
    path: '', component:  HomeComponent,
    canActivate: [AuthenticationGuard]
  },

  {
    path: 'auth/login',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (a) => a.AuthenticationModule
      ),
  },


  {
    path:'',
    canActivate: [AuthenticationGuard,CheckSchoolMandatoryMessagesGuard],
    children:[

      {
        path: 'schools-and-students',
        children: [
          {
            path: 'schools',
            loadChildren: () => import('./modules/schools/schools.module').then(m => m.SchoolsModule),
            canActivate: [ClaimsGuard],
            data:{
              allowedClaims: ClaimsEnum.S_Menu_SchoolsAndStudents,
            }
          },
          {
            path: 'all-parents',
            loadChildren: () => import('./modules/parants/parents.module').then(m => m.ParantsModule),
            canActivate: [ClaimsGuard],
            data:{
              allowedClaims: ClaimsEnum.S_Menu_SchoolsAndStudents,
            }
          },
          {
            path: 'students',
            loadChildren: () => import('./modules/students/students.module').then(m => m.StudentsModule),
            canActivate: [ClaimsGuard],
            data:{
              allowedClaims: ClaimsEnum.S_Menu_SchoolsAndStudents,
            }
          },
        ]
      },


      {
        path: 'school-management',
        children: [
          {
            path: 'school',
            loadChildren: () => import('./modules/schools/schools.module').then(m => m.SchoolsModule),
            canActivate: [ClaimsGuard],
            data:{
              allowedClaims: [ClaimsEnum.E_Menu_ManageSchool, , ClaimsEnum.E_MenuItem_Subjects],
            }
          },
          {
            path: 'requests-list',
            loadChildren: () => import('./modules/request-list/request-list.module').then(m => m.RequestListModule),
            canActivate: [ClaimsGuard],
            data:{title:{ar:'قائمه الطلبات',en: 'requests List'}}
          },
        ]
      },



      {
        path: 'student-management',
        children: [
          {
            path: 'all-parents',
            loadChildren: () => import('./modules/parants/parents.module').then(m => m.ParantsModule),
            canActivate: [ClaimsGuard],
            data:{
              allowedClaims: ClaimsEnum.E_menu_ManageStudents,
            }
          },
          {
            path: 'students',
            loadChildren: () => import('./modules/students/students.module').then(m => m.StudentsModule),
            canActivate: [ClaimsGuard],
            data:{
              allowedClaims: [ClaimsEnum.E_menu_ManageStudents],
            }
          },
        ]
      },




      {
        path:'performance-managment',
        children:[
          {
            path: 'assignments',
            loadChildren: () => import('./modules/assignments/assignments.module').then(m => m.AssignmentsModule),
            canActivate: [ClaimsGuard],
            data:{
              allowedClaims: ClaimsEnum.S_MenuItem_Setting,
            }
          },


          {
            path: 'RequestList',
            loadChildren: () => import('./modules/request-list/request-list.module').then(m => m.RequestListModule),
            canActivate: [ClaimsGuard],
            data:{title:{ar:'قائمه الطلبات',en: 'requests List'}}


          },
          {
            path: 'assessments',
            loadChildren: () => import('./modules/assessment/assessment.module').then(m => m.AssessmentModule),
            canActivate: [ClaimsGuard],
            data:{
              allowedClaims: ClaimsEnum.SE_MenuItem_Rate,
            }
          },

        ]
      },

      {
        path:'school-performance-managent',
        children:[
          {
            path: 'assignments',
            loadChildren: () => import('./modules/assignments/assignments.module').then(m => m.AssignmentsModule),
            canActivate: [ClaimsGuard],
            data:{
              allowedClaims: ClaimsEnum.SE_MenuItem_Exam,
              title:{ar:'الامتحانات',en: 'Exams'}
            }
          },
          {
            path: 'assessments',
            loadChildren: () => import('./modules/assessment/assessment.module').then(m => m.AssessmentModule),
            canActivate: [ClaimsGuard],
            data:{
              allowedClaims: ClaimsEnum.SE_MenuItem_Exam,
              title:{ar:'تقيمات المواد الدراسيه',en: 'Subjects rates'}
            }
          },

        ]
      },


      {
        path: 'educational-settings',
        children:[
          {
            path: 'surveys',
            loadChildren: () => import('./modules/surveys/surveys.module').then(m => m.SurveysModule),
            canActivate: [ClaimsGuard],
            data:{
              // allowedClaims: ClaimsEnum.S_MenuItem_Survey,
              title:{ar:'الاستبيانات',en: 'Surveys'}

            }
          },


            {
              path: 'annual-holiday',
              loadChildren: () => import('./modules/annual-holiday/annual-holiday.module').then(m => m.AnnualHolidayModule),
              canActivate: [ClaimsGuard],
              data:{
                allowedClaims: ClaimsEnum.S_MenuItem_Holiday,
              }
            },

            // {
            //   path: 'assessments',
            //   loadChildren: () => import('./modules/assessment/assessment.module').then(m => m.AssessmentModule),
            //   canActivate: [ClaimsGuard],
            //   data:{allowedClaims: ClaimsEnum.SE_MenuItem_Rate}
            // },
            {
              path: 'school-year',
              loadChildren: () => import('./modules/school-years/school-years.module').then(m => m.SchoolYearsModule),
              canActivate: [ClaimsGuard],
              data:{
                allowedClaims: ClaimsEnum.S_MenuItem_SchoolYear,
              }
            },

            {
              path: 'subject',
              loadChildren: () => import('./modules/subjects/subjects.module').then(m => m.SubjectsModule),
              canActivate: [ClaimsGuard],
              data:{
                allowedClaims: ClaimsEnum.S_MenuItem_SubjectMenu,
              }
            },
        ]
      },



      {
        path: 'schoolEmployee-management/school',
        loadChildren: () => import('./modules/schools/schools.module').then(m => m.SchoolsModule),
        canActivate: [ClaimsGuard],
        data:{
          allowedClaims: ClaimsEnum.E_menu_ManageSchoolEmployee,

        }
      },
      {
        path: 'grades-and-divisions/school',
        loadChildren: () => import('./modules/schools/schools.module').then(m => m.SchoolsModule),
        canActivate: [ClaimsGuard],
        data:{
          allowedClaims: ClaimsEnum.E_Menu_ManageGradesAndDivisions,
        }
      },


      // Manager Tools Routes
      {
        path:'manager-tools',
        children: [
          {
            path: 'user-roles',
            loadChildren: () => import('./modules/user-roles/user-roles.module').then(m => m.UserRolesModule),
            canActivate: [ClaimsGuard],
            data:{
              allowedClaims: ClaimsEnum.S_MenuItem_Role,
            }
          },
          {
            path: 'indexes',
            loadChildren: () => import('./modules/indexes/indexes.module').then(m => m.IndexesModule),
            canActivate: [ClaimsGuard],
            data:{
              allowedClaims: ClaimsEnum.S_MenuItem_Index,
            }
          },
          {
            path: 'settings',
            loadChildren: () => import('./modules/system-setting/system-setting.module').then(m => m.SystemSettingModule),
            canActivate: [ClaimsGuard],
            data:{
              allowedClaims: ClaimsEnum.S_MenuItem_Setting,
              title:{ar:'الاعدادات',en: 'Settings'}
            }
          },
          {
            path: 'user-information',
            loadChildren: () => import('./modules/user-information/user-information.module').then(m => m.UserInformationModule),
            canActivate: [ClaimsGuard],
            data:{
              allowedClaims: ClaimsEnum.S_MenuItem_user,
            }
          },
          {
            path: 'notifications',
            loadChildren: () => import('./modules/notifications-list/notifications-setting.module').then(m => m.NotificationsSettingModule),
            canActivate: [ClaimsGuard],
            data:{
              allowedClaims: ClaimsEnum.S_MenuItem_Setting,
              title:{ar:'اعدادات الاشعارات',en: 'Notifications Setting'}
            }
          },
        ]
      },

      {
        path: 'reports-managment',
        loadChildren: () => import('./modules/reports-managment/reports-managment.module').then(m => m.ReportsManagmentModule),
        canActivate: [ClaimsGuard],
        data:{
          allowedClaims: ClaimsEnum.S_Menu_ReportsManagement,
          title:{ar:'التقارير',en: 'Reports'}
        }
      },

      {
        path: 'messages',
        loadChildren: () => import('./modules/messages/messages.module').then(m =>m.MessagesModule),
        data:{
          title:{ar:'الرسائل',en: 'Messages'}
        }
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./modules/notifications/notification.module').then(
            (a) => a.NotificationModule
          ),
          data:{
            title:{ar:'الإشعارات',en: 'Notifications'}
          }
      },

      {
        path: 'certificates',
        loadChildren: () =>
        import('./modules/issuance-of-a-certificate-pages/issue-certificate.module').then(
          (a) => a.IssuanceCertificateModule)
      },

      {
        path: 'requests-list',
        canActivate: [CheeckMandatoryServeyGuard],
        loadChildren: () => import('./modules/request-list/request-list.module').then(m => m.RequestListModule),
        data:{
          title:{ar:'الطلبات',en: 'Requests List'}
        }
      },
    ],
  },



  { path: 'parent',
    loadChildren: () => import('./modules/guardian/guardian.module').then(
    (m) => m.GuardianModule) ,
    canActivate: [AuthenticationGuard]
  },

  {
    path: 'certificate/:id',
    component: CertificateDetailsComponent,
    canActivate: [AuthenticationGuard]
  },


  Layout.childRoutes([
    {
      path:'oops/page-not-allowed',
      component:NotAllowedComponent,
      canActivate: [AuthenticationGuard]

    }
  ]),

  {
    path: '**',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  }

