import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { GuardianHomeComponent } from './components/guardian-home/guardian-home.component';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from '../primng/primng.module';
import {ConfirmPopupModule} from 'primeng/confirmpopup';




@NgModule({
  declarations: [
    HomeComponent,
    GuardianHomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    PrimngModule,
    ConfirmPopupModule
  ]
})
export class HomeModule { }
