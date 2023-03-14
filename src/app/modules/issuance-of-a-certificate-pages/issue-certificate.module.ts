import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuanceOfACertificatePagesRoutingModule } from './issue-certificate-routing.module';
import { PrimngModule } from '../primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CertificateDetailsComponent } from './components/certificate-details/certificate-details.component';
import { QrCodeModule } from 'ng-qrcode';
import { AcademicSequenceComponent } from './components/academic-sequence/academic-sequence.component';
import { BoardCertificateComponent } from './components/board-certificate/board-certificate.component';
import { DegreeCertificateComponent } from './components/degree-certificate/degree-certificate.component';
import { IssueCertificateComponent } from './issue-certificate.component';
import { DiplomaCertificateComponent } from './components/diploma-certificate/diploma-certificate.component';


@NgModule({
  declarations: [
    IssueCertificateComponent,
    CertificateDetailsComponent,
    AcademicSequenceComponent,
    BoardCertificateComponent,
    DegreeCertificateComponent,
    DiplomaCertificateComponent,
  ],
  imports: [
    CommonModule,
    IssuanceOfACertificatePagesRoutingModule,
    PrimngModule,
    SharedModule,
    QrCodeModule,
  ]
})
export class IssuanceCertificateModule { }
