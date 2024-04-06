import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import {TooltipModule} from 'primeng/tooltip';


const modules=[
  InputTextModule,
  PaginatorModule,
  DropdownModule,
  CardModule,
  SkeletonModule,
  TooltipModule,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules

  ],
  exports:[modules]
})
export class PrimngModule { }
