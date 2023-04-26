import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheeckMandatoryServeyGuard } from 'src/app/core/guards/check-mandatory-servey.guard';
import { CertificateDetailsComponent } from './components/certificate-details/certificate-details.component';
import { IssueCertificateComponent } from './issue-certificate.component';
import { LayoutComponent } from 'src/app/layout/layout.component';

const routes: Routes = [
  {
    path:'', component: LayoutComponent,
    children: [
      {path:"certificate-details",component:CertificateDetailsComponent},
      {path:"ask-certificate",component:IssueCertificateComponent,canActivate: [CheeckMandatoryServeyGuard]},
      {path:"ask-certificate/:studentId",component:IssueCertificateComponent,canActivate:[CheeckMandatoryServeyGuard]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuanceOfACertificatePagesRoutingModule { }
