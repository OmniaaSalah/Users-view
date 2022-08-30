import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParantsRoutingModule } from './parants-routing.module';
import { ParantsComponent } from './components/parents-list/parants.component';



@NgModule({
  declarations: [
    ParantsComponent
  ],
  imports: [
    CommonModule,
    ParantsRoutingModule
  ]
})
export class ParantsModule { }
