import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditUserInformationComponent } from './components/add-edit-user-information/add-edit-user-information.component';
import { ViewListOfUsersComponent } from './components/view-list-of-users/view-list-of-users.component';

const routes: Routes = [
{path:"ViewUsersList",component:ViewListOfUsersComponent},
{path:"NewUser",component:AddEditUserInformationComponent},
{path:"EditUser/:UID",component:AddEditUserInformationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInformationRoutingModule { }
