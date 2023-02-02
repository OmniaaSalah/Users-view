import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuardianHomeRoutingModule } from './guardian-home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GuardianHomeRoutingModule,
    SharedModule
  ]
})
export class GuardianHomeModule { }
