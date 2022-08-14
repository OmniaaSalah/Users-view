import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PrimngModule } from '../modules/primng/primng.module';
import { LayoutModule } from '../layout/layout.module';


@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    PrimngModule,
    LayoutModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    PaginationComponent,
    LayoutModule
  ]
})
export class SharedModule { }
