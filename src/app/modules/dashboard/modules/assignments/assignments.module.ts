import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimngModule } from 'src/app/shared/primng/shared-primng.module';
import { SharedModule } from '../../../../shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { AssignmentsListComponent } from './assignments/assignments-list/assignments-list.component';
import { UploadAssignmentComponent } from './assignments/upload-assignment/upload-assignment.component';
import { AssignmentRoutingModule } from './assignments-routing.module';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from "primeng/card";




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
