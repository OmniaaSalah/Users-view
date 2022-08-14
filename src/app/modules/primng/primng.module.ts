import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule
  ],
  exports:[TableModule,InputTextModule]
})
export class PrimngModule { }
