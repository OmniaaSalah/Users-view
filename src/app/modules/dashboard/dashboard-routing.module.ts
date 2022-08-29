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
        loadChildren: () => import('./components/schools/schools.module').then(m => m.SchoolsModule)
      },
      {
        path: 'AnnualHoliday',
        loadChildren: () => import('./components/Annual_Holiday/annual-holiday.module').then(m => m.AnnualHolidayModule)
      },
      {
        path: 'UserRoles',
        loadChildren: () => import('./components/UserRoles/user-roles.module').then(m => m.UserRolesModule)
      },
      {
        path: 'UserInformation',
        loadChildren: () => import('./components/UserInformation/user-information.module').then(m => m.UserInformationModule)
      },

      {
        path: 'Subjects',
        loadChildren: () => import('./components/subjects/subjects.module').then(m => m.SubjectsModule)
      },
      {
        path: 'assignments',
        loadChildren: () => import('./components/assignments/assignments/assignments.module').then(m => m.AssignmentsModule)
      },
      {
        path: 'students',
        loadChildren: () => import('./components/students/students.module').then(m => m.StudentsModule)
      },

      ]
    },

    { path: 'parants', loadChildren: () => import('./components/parants/parants.module').then(m => m.ParantsModule) },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
