import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {PaginatorModule} from 'primeng/paginator';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';


import {CalendarModule} from 'primeng/calendar';

const modules=[
  TableModule,
  InputTextModule,
  MenuModule,
  PaginatorModule,
  BreadcrumbModule,
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules,
    CalendarModule,
    PaginatorModule,
    BreadcrumbModule
  ],
  exports:[modules,CalendarModule,PaginatorModule,BreadcrumbModule]
})
export class PrimngModule { }
