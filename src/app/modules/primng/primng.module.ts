import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {PaginatorModule} from 'primeng/paginator';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    PaginatorModule
  ],
  exports:[TableModule,InputTextModule,CalendarModule,PaginatorModule]
})
export class PrimngModule { }
