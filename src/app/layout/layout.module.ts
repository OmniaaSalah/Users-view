import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DropdownModule } from 'primeng/dropdown';
import {BadgeModule} from 'primeng/badge';
import { SharedModule } from '../shared/shared.module';
import { DashboardPanalComponent } from '../modules/dashboard/components/dashboard-panal/dashboard-panal.component';
import { HeaderDashboardComponent } from '../modules/dashboard/components/header-dashboard/header-dashboard.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    DashboardPanalComponent,
    HeaderDashboardComponent
  ],
  imports: [
    TranslateModule,
    CalendarModule,
    BreadcrumbModule,
    InfiniteScrollModule,
    DropdownModule,
    BadgeModule,
    SharedModule

  ],
  exports: [
    HeaderComponent,
    LayoutComponent,
  ]
})
export class LayoutModule { }
