import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './core/services/auth-guard.service';
import { AuthenticationGuard } from './core/services/guards/authentication.guard';
import { CheckSchoolMandatoryMessagesGuard } from './core/services/guards/check-school-mandatory-messages.guard';
// import { TokenGuard } from './core/services/token-guard.service';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: () =>
      import('./modules/home-page/home.module').then(
        (a) => a.HomeModule
      ),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./modules/notifications/notification.module').then(
        (a) => a.NotificationModule
      ),
    canActivate: [AuthenticationGuard,CheckSchoolMandatoryMessagesGuard]
    
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (a) => a.DashboardModule
      ),
    canActivate: [AuthenticationGuard,CheckSchoolMandatoryMessagesGuard]
  },
  {
    path: 'certificates',
    loadChildren: () =>
      import('./modules/issuance-of-a-certificate-pages/issuance-certificate.module').then(
        (a) => a.IssuanceCertificateModule
        
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
  
  // { path: 'register-request', 
  //   loadChildren: () => import('./modules/register-request/register-request.module')
  //   .then(m => m.RegisterRequestModule) 
  // },
  { path: 'parent', 
    loadChildren: () => import('./modules/guardian/guardian.module').then(
    (m) => m.GuardianModule) ,
    canActivate: [AuthenticationGuard]
  }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  }

