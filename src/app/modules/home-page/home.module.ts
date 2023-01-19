import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ParentsComponent } from './components/parents-home/parents-home.component';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from '../primng/primng.module';


@NgModule({
  declarations: [
    HomeComponent,
    ParentsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    PrimngModule
  ]
})
export class HomeModule { }
