import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskForIssuanceOfACertificateComponent } from './components/ask-for-issuance-of-a-certificate/ask-for-issuance-of-a-certificate.component';
import { CertificateDetailsComponent } from './components/certificate-details/certificate-details.component';

const routes: Routes = [
  {path:"details",component:CertificateDetailsComponent},
  {path:"ask-certificate",component:AskForIssuanceOfACertificateComponent},
  {path:"ask-certificate/:studentId",component:AskForIssuanceOfACertificateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuanceOfACertificatePagesRoutingModule { }
