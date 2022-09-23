import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { DeletedStudentComponent } from './components/deleted-student/deleted-student.component';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FileUploadModule } from 'primeng/fileupload';
import { TranslateModule } from '@ngx-translate/core';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { TransferStudentComponent } from './components/transfer-student/transfer-student.component';
import { StudentMedicalFileComponent } from './components/student-medical-file/student-medical-file.component';
import { DashboardSharedModule } from '../shared/dashboard-shared/dashboard-shared.module';




@NgModule({
  declarations: [
    StudentsListComponent,
    DeletedStudentComponent,
    StudentDetailsComponent,
    RegisterStudentComponent,
    TransferStudentComponent,
    StudentMedicalFileComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    PrimngModule,
    SharedModule,

  ]
})
export class StudentsModule { }
