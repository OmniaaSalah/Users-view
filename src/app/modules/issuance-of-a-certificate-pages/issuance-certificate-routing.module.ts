import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuanceCertificateComponent } from './components/issuance-certificate/issuance-certificate.component';
import { CertificateDetailsComponent } from './components/certificate-details/certificate-details.component';

const routes: Routes = [
  {path:"certificate-details",component:CertificateDetailsComponent},
  {path:"ask-certificate",component:IssuanceCertificateComponent},
  {path:"ask-certificate/:studentId",component:IssuanceCertificateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuanceOfACertificatePagesRoutingModule { }
