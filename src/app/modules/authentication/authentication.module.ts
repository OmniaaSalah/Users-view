import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationMainComponent } from './components/authentication-main/authentication-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from 'src/app/layout/layout.module';
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
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    TranslateModule,
    PrimngModule,
    LayoutModule
    
  ]
})
export class AuthenticationModule { }
