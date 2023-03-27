import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheeckMandatoryServeyGuard } from 'src/app/core/services/guards/check-mandatory-servey.guard';
import { CertificateDetailsComponent } from './components/certificate-details/certificate-details.component';
import { IssueCertificateComponent } from './issue-certificate.component';

const routes: Routes = [
  {path:"certificate-details",component:CertificateDetailsComponent},
  {path:"ask-certificate",component:IssueCertificateComponent,canActivate: [CheeckMandatoryServeyGuard]},
  {path:"ask-certificate/:studentId",component:IssueCertificateComponent,canActivate:[CheeckMandatoryServeyGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuanceOfACertificatePagesRoutingModule { }
