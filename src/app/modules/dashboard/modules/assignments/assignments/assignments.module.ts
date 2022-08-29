import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { AssignmentsListComponent } from './assignments-list/assignments-list.component';
import { UploadAssignmentComponent } from './upload-assignment/upload-assignment.component';
import { AssignmentRoutingModule } from '../assignments-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FileUploadModule } from 'primeng/fileupload';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderModule } from '../../Header/header/header-dashboard.module';



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
    NgxPaginationModule,
    FileUploadModule,
    TranslateModule,
    HeaderModule

  ]
})
export class AssignmentsModule { }
