import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth-guard.service';
import { TokenGuard } from './core/services/token-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/current-user/current-user.module').then(
        (a) => a.CurrentUserModule
      ),
    canActivate: [TokenGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (a) => a.DashboardModule
      ),
    canActivate: [TokenGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (a) => a.AuthenticationModule
      ),
    canActivate: [TokenGuard],
  },
  {
    path: 'schools',
    loadChildren: () =>
      import('./modules/schools/schools.module').then(
        (a) => a.SchoolsModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },

  {
    path: 'schools', 
    loadChildren: () => import('./modules/schools/schools.module').then((m) => m.SchoolsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
