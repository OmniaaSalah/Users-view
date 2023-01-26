import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentsRoutingModule } from './guardian-routing.module';
import { GuardianComponent } from './guardian.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from '../primng/primng.module';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    GuardianComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ParentsRoutingModule,
    SharedModule,
    PrimngModule
  ]
})
export class GuardianModule { }
