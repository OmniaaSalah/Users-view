import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentsRoutingModule } from './parents-routing.module';
import { ParentsComponent } from './parents.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from '../primng/primng.module';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    ParentsComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ParentsRoutingModule,
    SharedModule,
    PrimngModule
  ]
})
export class ParentsModule { }
