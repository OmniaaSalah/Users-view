import { NgModule } from '@angular/core';
import { PrimngModule } from 'src/app/primng/primeNg.module';
import { AssignmentsListComponent } from './assignments/assignments-list/assignments-list.component';
import { UploadAssignmentComponent } from './assignments/upload-assignment/upload-assignment.component';
import { AssignmentRoutingModule } from './assignments-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AssignmentsListComponent,
    UploadAssignmentComponent

  ],
  imports: [
    AssignmentRoutingModule,
    PrimngModule,
    SharedModule,


  ],
  providers:[]
})
export class AssignmentsModule { }
