import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { AssignmentsListComponent } from './assignments/assignments-list/assignments-list.component';
import { UploadAssignmentComponent } from './assignments/upload-assignment/upload-assignment.component';
import { AssignmentRoutingModule } from './assignments-routing.module';
import { FileUploadModule } from 'primeng/fileupload';
import { TranslateModule } from '@ngx-translate/core';




@NgModule({
  declarations: [
    AssignmentsListComponent,
    UploadAssignmentComponent
  ],
  imports: [
    CommonModule,
    AssignmentRoutingModule,
    PrimngModule,
    SharedModule,
    CalendarModule,
    FileUploadModule,
    TranslateModule
 

  ]
})
export class AssignmentsModule { }
