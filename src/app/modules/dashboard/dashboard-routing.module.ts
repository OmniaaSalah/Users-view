import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from 'src/app/layout/layout-routing.service';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [

  Layout.childRoutes([
    {
      path: '',
      component: DashboardComponent,
      children: [

        {
          path: 'schools',
          loadChildren: () => import('./components/schools/schools.module').then(m => m.SchoolsModule)
        },
        {
          path: 'AnnualHoliday',
          loadChildren: () => import('./components/Annual_Holiday/annual-holiday/annual-holiday.module').then(m => m.AnnualHolidayModule)
        },

        {
          path: 'Subjects',
          loadChildren: () => import('./components/subjects/subjects/subjects/subjects.module').then(m => m.SubjectsModule)
        }

      ]
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
