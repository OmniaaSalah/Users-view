import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PrimngModule } from '../primng/primeNg.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PrimngModule,
    SharedModule,
  ],
  exports:[
    HttpClientModule,

  ]
})
export class CoreModule { }
