import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [SidebarComponent, HeaderComponent, LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    TranslateModule,
    CalendarModule
    // SharedModule
  ],
  exports: [SidebarComponent, HeaderComponent, LayoutComponent]
})
export class LayoutModule { }
