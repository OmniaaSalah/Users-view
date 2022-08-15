import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './core/services/auth-guard.service';
import { AuthenticationGuard } from './core/services/authentication.guard';
// import { TokenGuard } from './core/services/token-guard.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (a) => a.AuthenticationModule
      ),
  },
  {
    path: 'schools',
    loadChildren: () =>
      import('./modules/schools/schools.module').then(
        (a) => a.SchoolsModule
      ),
    canActivate: [AuthenticationGuard],
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
