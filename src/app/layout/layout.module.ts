import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderDashboardComponent } from './header-dashboard/header-dashboard.component';

import { PrimngModule } from '../modules/primng/primng.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [SidebarComponent, HeaderComponent, LayoutComponent,HeaderDashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    TranslateModule,
    PrimngModule
,
    FontAwesomeModule
  ],
  exports: [SidebarComponent, HeaderComponent, LayoutComponent,HeaderDashboardComponent]
})
export class LayoutModule { }
