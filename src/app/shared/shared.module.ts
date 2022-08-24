import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PrimngModule } from '../modules/primng/primng.module';
import { LayoutModule } from '../layout/layout.module';
import { InformativeBlockComponent } from './components/informative-block/informative-block.component';




@NgModule({
  declarations: [
    PaginationComponent,
    InformativeBlockComponent
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
    LayoutModule,
    InformativeBlockComponent
  ]
})
export class SharedModule { }
