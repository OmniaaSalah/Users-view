import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardianHomeComponent } from './guardian-home.component';

const routes: Routes = [
  {path:'', component: GuardianHomeComponent},
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuardianHomeRoutingModule { }
