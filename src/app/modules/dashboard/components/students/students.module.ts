import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { DeletedStudentComponent } from './components/deleted-student/deleted-student.component';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FileUploadModule } from 'primeng/fileupload';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    StudentsListComponent,
    DeletedStudentComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    PrimngModule,
    SharedModule,
    NgxPaginationModule,
    FileUploadModule,
    TranslateModule
  ]
})
export class StudentsModule { }
