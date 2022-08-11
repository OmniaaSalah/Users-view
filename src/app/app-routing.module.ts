import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (a) => a.AuthenticationModule
      )
  },
  {path:'AnnualHoliday',
  loadChildren:()=>import('./modules/Annual_Holiday/annual-holiday/annual-holiday.module').then(m=>m.AnnualHolidayModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
