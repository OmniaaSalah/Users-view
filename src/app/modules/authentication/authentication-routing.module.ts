import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationMainComponent } from './components/authentication-main/authentication-main.component';


const routes: Routes = [
  {
    path: '',component: AuthenticationMainComponent,
    data:{
      title:{ar:'تسجيل الدخول',en: 'SignIn'}
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
