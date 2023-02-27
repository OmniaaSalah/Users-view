import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuanceOfACertificatePagesRoutingModule } from './issuance-of-a-certificate-pages-routing.module';
import { AskForIssuanceOfACertificateComponent } from './components/ask-for-issuance-of-a-certificate/ask-for-issuance-of-a-certificate.component';
import { PrimngModule } from '../primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddStudentCertificateComponent } from './components/add-student-certificate/add-student-certificate.component';
import { StudentsBoardCertificateComponent } from './components/students-board-certificate/students-board-certificate.component';
import { CertificateDetailsComponent } from './components/certificate-details/certificate-details.component';
import { QrCodeModule } from 'ng-qrcode';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    AskForIssuanceOfACertificateComponent,
    AddStudentCertificateComponent,
    StudentsBoardCertificateComponent,
    CertificateDetailsComponent
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
export class IssuanceOfACertificatePagesModule { }
