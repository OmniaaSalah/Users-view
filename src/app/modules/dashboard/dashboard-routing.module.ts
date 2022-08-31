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
        path: 'AnnualHoliday',
        loadChildren: () => import('./modules/Annual_Holiday/annual-holiday.module').then(m => m.AnnualHolidayModule)
      },
      {
        path: 'UserRoles',
        loadChildren: () => import('./modules/UserRoles/user-roles/user-roles.module').then(m => m.UserRolesModule)
      },

      {
        path: 'Subjects',
        loadChildren: () => import('./modules/subjects/subjects/subjects/subjects.module').then(m => m.SubjectsModule)
      },
      {
        path: 'assignments',
        loadChildren: () => import('./modules/assignments/assignments/assignments.module').then(m => m.AssignmentsModule)
      },

      ]
    },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
