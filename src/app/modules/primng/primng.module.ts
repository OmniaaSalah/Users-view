import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {PaginatorModule} from 'primeng/paginator';
import {DividerModule} from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {GalleriaModule} from 'primeng/galleria';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';


import {InputNumberModule} from 'primeng/inputnumber';
import {DialogModule} from 'primeng/dialog';
import {GMapModule} from 'primeng/gmap';
import {AccordionModule} from 'primeng/accordion';
import {CheckboxModule} from 'primeng/checkbox';


const modules=[
  TableModule,
  InputTextModule,
  MenuModule,
  PaginatorModule,
  DividerModule,
  ButtonModule,
  BreadcrumbModule,
  GalleriaModule,
  DropdownModule,
  InputNumberModule,
  DialogModule,
  GMapModule,
  AccordionModule,
  CalendarModule,
  CheckboxModule,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules,

  ],
  exports:[modules,]
})
export class PrimngModule { }
