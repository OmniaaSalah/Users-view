import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarModule } from 'primeng/calendar';
import { HeaderDashboardComponent } from '../modules/dashboard/modules/components/header-dashboard/header-dashboard.component';


@NgModule({
  declarations: [SidebarComponent, HeaderComponent, LayoutComponent,HeaderDashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    TranslateModule,
    CalendarModule
  ],
  exports: [SidebarComponent, HeaderComponent, LayoutComponent,HeaderDashboardComponent]
})
export class LayoutModule { }
