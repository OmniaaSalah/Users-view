import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from './components/pagination/pagination.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { PrimngModule } from '../modules/primng/primng.module';


@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    NgxPaginationModule,
    PrimngModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    PaginationComponent
  ]
})
export class SharedModule { }
