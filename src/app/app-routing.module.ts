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
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (a) => a.DashboardModule
      ),
    canActivate: [AuthGuard],
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
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
