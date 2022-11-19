import { ReigsterWithNationalityComponent } from './../add-new-child/reigster-with-nationality/reigster-with-nationality.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentsComponent } from './parents.component';

const routes: Routes = [
  {path:'', component: ParentsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentsRoutingModule { }
