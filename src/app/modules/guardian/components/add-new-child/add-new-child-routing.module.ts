import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithIdentityComponent } from './with-identity/with-identity.component';
import { WithoutIdentityComponent } from './without-identity/without-identity.component';

const routes: Routes = [
  {path:'Addchild-WithoutNationality', component: WithoutIdentityComponent},
  {path:'Addchild-WithNationality', component: WithIdentityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNewChildRoutingModule { }
