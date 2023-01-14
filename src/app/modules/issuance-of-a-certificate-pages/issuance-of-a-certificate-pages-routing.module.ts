import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskForIssuanceOfACertificateComponent } from './components/ask-for-issuance-of-a-certificate/ask-for-issuance-of-a-certificate.component';

const routes: Routes = [
  {path:"ask-certificate",component:AskForIssuanceOfACertificateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuanceOfACertificatePagesRoutingModule { }
