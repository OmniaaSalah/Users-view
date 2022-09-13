import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditUserInformationComponent } from './components/edit-new-user-information/edit-new-user-information.component';
import { ViewListOfUsersComponent } from './components/users-list/users-list.component';

const routes: Routes = [
{path:"users-list",component:ViewListOfUsersComponent},
{path:"new-user",component:AddEditUserInformationComponent},
{path:"edit-user/:userId",component:AddEditUserInformationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInformationRoutingModule { }
