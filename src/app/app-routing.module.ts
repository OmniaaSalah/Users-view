import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './core/services/auth-guard.service';
import { AuthenticationGuard } from './core/services/authentication.guard';
// import { TokenGuard } from './core/services/token-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/current-user/current-user.module').then(
        (a) => a.CurrentUserModule
      ),
    canActivate: [],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (a) => a.DashboardModule
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (a) => a.AuthenticationModule
      ),
  },
<<<<<<< HEAD
  
=======
  {
    path: 'schools',
    loadChildren: () =>
      import('./modules/schools/schools.module').then(
        (a) => a.SchoolsModule
      ),
    canActivate: [AuthenticationGuard],
  },
>>>>>>> 678f361f82c5ca9b6b997839cafa40143d5861fc

  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
<<<<<<< HEAD
  
=======

  {
    path: 'schools',
    loadChildren: () => import('./modules/schools/schools.module').then((m) => m.SchoolsModule)
  },
>>>>>>> 678f361f82c5ca9b6b997839cafa40143d5861fc
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
