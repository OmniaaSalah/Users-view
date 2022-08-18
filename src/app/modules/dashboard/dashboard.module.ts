import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewSubjectComponent } from './components/subjects/components/new-subject/new-subject.component';



@NgModule({
  declarations: [
    DashboardComponent,
    NewSubjectComponent,
   
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
