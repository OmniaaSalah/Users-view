import { NgModule } from '@angular/core';
import { PrimngModule } from 'src/app/primeNg/primeNg.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationMainComponent } from './components/authentication-main/authentication-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgOtpInputModule } from  'ng-otp-input';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';



@NgModule({
  declarations: [
    AuthenticationMainComponent,
    NewAccountComponent,
    ForgetPasswordComponent,

  ],
  imports: [
    NgOtpInputModule,
    AuthenticationRoutingModule,
    SharedModule,
    PrimngModule,

  ]
})
export class AuthenticationModule { }
