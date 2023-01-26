import { AddNewChildComponent } from './add-new-child.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReigsterWithNationalityComponent } from './reigster-with-nationality/reigster-with-nationality.component';
import { ReigsterWithoutNationalityComponent } from './reigster-without-nationality/reigster-without-nationality.component';

const routes: Routes = [
  {path:'Addchild-WithoutNationality', component: ReigsterWithoutNationalityComponent},
  {path:'Addchild-WithNationality', component: ReigsterWithNationalityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNewChildRoutingModule { }
