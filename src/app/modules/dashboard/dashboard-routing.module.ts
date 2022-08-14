import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {path:'' ,
   component: DashboardComponent,
  children:[

    { 
      path: 'schools', 
      loadChildren: () => import('./components/schools/schools.module').then(m => m.SchoolsModule) 
    },
    {path:'AnnualHoliday',
     loadChildren:()=>import('./components/Annual_Holiday/annual-holiday/annual-holiday.module').then(m=>m.AnnualHolidayModule)}
    
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
