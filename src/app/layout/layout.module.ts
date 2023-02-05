import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarModule } from 'primeng/calendar';
import { HeaderDashboardComponent } from '../modules/dashboard/components/header-dashboard/header-dashboard.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ClickOutsideDirective } from '../shared/directives/click-outside/click-outside.directive';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../shared/shared.module';
import { PermissionDirective } from '../shared/directives/permission/permission.directive';
import { FormsModule } from '@angular/forms';
import { CurrentLangPipe } from '../shared/pipes/current-lang/current-lang.pipe';
import {BadgeModule} from 'primeng/badge';
import { LocalizeDatePipe } from '../shared/pipes/localize-date.pipe';

@NgModule({
  declarations: [
    SidebarComponent, 
    HeaderComponent, 
    LayoutComponent,
    HeaderDashboardComponent,
    ClickOutsideDirective,
    PermissionDirective

   
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
    TranslateModule,
    CalendarModule,
    BreadcrumbModule,
    InfiniteScrollModule,
    DropdownModule,
    BadgeModule
    

  
  
  ],
  exports: [SidebarComponent, HeaderComponent, LayoutComponent,HeaderDashboardComponent,ClickOutsideDirective,PermissionDirective]
})
export class LayoutModule { }
