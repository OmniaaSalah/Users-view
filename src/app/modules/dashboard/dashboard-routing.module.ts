import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    children: [

      {
        path: 'schools-and-students/schools',
        loadChildren: () => import('./modules/schools/schools.module').then(m => m.SchoolsModule)
      },

      {
        path: 'schools-and-students/all-parents',
        loadChildren: () => import('./modules/parants/parents.module').then(m => m.ParantsModule)
      },
      {
        path: 'schools-and-students/students',
        loadChildren: () => import('./modules/students/students.module').then(m => m.StudentsModule)
      },


      {
        path: 'educational-settings/surveys',
        loadChildren: () => import('./modules/surveys/surveys.module').then(m => m.SurveysModule)
      },

      {
        path: 'educational-settings/AnnualHoliday',
        loadChildren: () => import('./modules/annual-holiday/annual-holiday.module').then(m => m.AnnualHolidayModule)
      },
      {
        path: 'educational-settings/Assessments',
        loadChildren: () => import('./modules/assessment/assessment.module').then(m => m.AssessmentModule)
      },

      {
        path: 'manager-tools/UserRoles',
        loadChildren: () => import('./modules/user-roles/user-roles.module').then(m => m.UserRolesModule)
      },
      {
        path: 'manager-tools/Indexes',
        loadChildren: () => import('./modules/indexes/indexes.module').then(m => m.IndexesModule)
      },
      {
        path: 'manager-tools/UserInformation',
        loadChildren: () => import('./modules/user-information/user-information.module').then(m => m.UserInformationModule)
      },

      {
        path: 'educational-settings/Subjects',
        loadChildren: () => import('./modules/subjects/subjects.module').then(m => m.SubjectsModule)
      },
      {
        path: 'assignments',
        loadChildren: () => import('./modules/assignments/assignments/assignments.module').then(m => m.AssignmentsModule)
      },
      {
        path: 'reports-managment',
        loadChildren: () => import('./modules/reports-managment/reports-managment.module').then(m => m.ReportsManagmentModule)
      }


    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
