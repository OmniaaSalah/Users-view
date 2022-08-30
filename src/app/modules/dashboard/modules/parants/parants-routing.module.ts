import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParantsComponent } from './components/parents-list/parants.component';

const routes: Routes = [{ path: '', component: ParantsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParantsRoutingModule { }
