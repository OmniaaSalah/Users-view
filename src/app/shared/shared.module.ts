import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule

  ]
})
export class SharedModule { }
