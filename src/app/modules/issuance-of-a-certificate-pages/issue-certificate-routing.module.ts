import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheeckMandatoryServeyGuard } from 'src/app/core/guards/check-mandatory-servey.guard';
import { CertificateDetailsComponent } from './components/certificate-details/certificate-details.component';
import { IssueCertificateComponent } from './issue-certificate.component';
import { Layout } from 'src/app/layout/layout-routing.service';

const routes: Routes = [
  Layout.childRoutes([
    {
      path:"ask-certificate",
      component:IssueCertificateComponent,
      canActivate: [CheeckMandatoryServeyGuard],
      data:{
        title:{ar:'الشهادات',en: 'Certificates'}
      }
    },
    {path:"certificate-details",component:CertificateDetailsComponent},
    {path:"ask-certificate/:studentId",component:IssueCertificateComponent,canActivate:[CheeckMandatoryServeyGuard]},
  ])

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuanceOfACertificatePagesRoutingModule { }
