import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {PaginatorModule} from 'primeng/paginator';
import {DividerModule} from 'primeng/divider';
import { ButtonModule } from 'primeng/button';import {BreadcrumbModule} from 'primeng/breadcrumb';


import {CalendarModule} from 'primeng/calendar';

const modules=[
  TableModule,
  InputTextModule,
  MenuModule,
  PaginatorModule,
  DividerModule,
  ButtonModule,
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
