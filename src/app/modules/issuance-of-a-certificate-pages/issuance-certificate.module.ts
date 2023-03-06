import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuanceOfACertificatePagesRoutingModule } from './issuance-certificate-routing.module';
import { PrimngModule } from '../primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddStudentCertificateComponent } from './components/add-student-certificate/add-student-certificate.component';
import { StudentsBoardCertificateComponent } from './components/students-board-certificate/students-board-certificate.component';
import { CertificateDetailsComponent } from './components/certificate-details/certificate-details.component';
import { QrCodeModule } from 'ng-qrcode';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AcademicSequenceComponent } from './components/academic-sequence/academic-sequence.component';
import { BoardCertificateComponent } from './components/board-certificate/board-certificate.component';
import { DegreeCertificateComponent } from './components/degree-certificate/degree-certificate.component';
import { IssuanceCertificateComponent } from './components/issuance-certificate/issuance-certificate.component';


@NgModule({
  declarations: [
    IssuanceCertificateComponent,
    AddStudentCertificateComponent,
    StudentsBoardCertificateComponent,
    CertificateDetailsComponent,
    AcademicSequenceComponent,
    BoardCertificateComponent,
    DegreeCertificateComponent
  ],
  imports: [
    CommonModule,
    IssuanceOfACertificatePagesRoutingModule,
    PrimngModule,
    SharedModule,
    QrCodeModule,
    PdfViewerModule
  ]
})
export class IssuanceCertificateModule { }
