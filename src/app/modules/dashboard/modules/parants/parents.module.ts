import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentsRoutingModule } from './parents-routing.module';
import { ParantsComponent } from './components/parents-list/parants.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { ChildrenListComponent } from './components/children-list/children-list.component';
import { ChildDetailsComponent } from './components/child-details/child-details.component';



@NgModule({
  declarations: [
    ParantsComponent,
    ChildrenListComponent,
    ChildDetailsComponent
  ],
  imports: [
    CommonModule,
    ParentsRoutingModule,
    SharedModule,
    PrimngModule
  ]
})
export class ParantsModule { }
