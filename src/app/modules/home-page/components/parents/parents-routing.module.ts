import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildDetailsComponent } from 'src/app/modules/dashboard/modules/parants/components/child-details/child-details.component';
import { ParentsComponent } from './parents.component';

const routes: Routes = [
  {path:'', component: ParentsComponent},
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentsRoutingModule { }
