import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { DeletedStudentComponent } from './components/deleted-student/deleted-student.component';
import { PrimngModule } from 'src/app/primng/primeNg.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { TransferStudentComponent } from './components/transfer-student/transfer-student.component';
import { ManualCertificatesComponent } from './components/manual-certificates/manual-certificates.component';
import { IssuanceCertificateModule } from '../issuance-of-a-certificate-pages/issue-certificate.module';
import { FeaturesSharedModule } from '../shared/Features-shared.module';




@NgModule({
  declarations: [
    StudentsListComponent,
    DeletedStudentComponent,
    StudentDetailsComponent,
    TransferStudentComponent,
    ManualCertificatesComponent,

  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    PrimngModule,
    SharedModule,
    FeaturesSharedModule,
    IssuanceCertificateModule
  ]
})
export class StudentsModule { }
