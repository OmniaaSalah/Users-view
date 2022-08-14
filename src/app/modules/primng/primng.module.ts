import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {PaginatorModule} from 'primeng/paginator';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';

import {CalendarModule} from 'primeng/calendar';

const modules=[
  TableModule,
  InputTextModule,
  MenuModule,
  PaginatorModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules,
    CalendarModule,
    PaginatorModule
  ],
  exports:[modules,CalendarModule,PaginatorModule]
})
export class PrimngModule { }
