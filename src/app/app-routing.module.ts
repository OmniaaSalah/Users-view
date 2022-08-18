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
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (a) => a.DashboardModule
      ),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (a) => a.AuthenticationModule
      ),
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
