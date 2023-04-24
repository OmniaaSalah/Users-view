import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutComponent } from './layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DropdownModule } from 'primeng/dropdown';
import {BadgeModule} from 'primeng/badge';
import { SharedModule } from '../shared/shared.module';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SideNavigatorComponent } from './side-navigator/side-navigator.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LayoutComponent,
    SideNavigatorComponent,
    PageHeaderComponent
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
    NavbarComponent,
    LayoutComponent,
  ]
})
export class LayoutModule { }
