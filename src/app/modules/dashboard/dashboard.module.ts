import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardSharedModule } from './shared/dashboard-shared.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    // DashboardPanalComponent,

  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
    DashboardSharedModule,

  ]
})
export class DashboardModule { }
