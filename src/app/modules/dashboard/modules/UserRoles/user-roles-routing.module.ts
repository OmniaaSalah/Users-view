import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserRoleComponent } from './components/new-user-role/new-user-role.component';
import { ViewUserRolesComponent } from './components/view-user-roles/view-user-roles.component';

const routes: Routes = [
  {path:"ViewUserRoles",component:ViewUserRolesComponent},
{path:"NewRole",component:NewUserRoleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class UserRolesRoutingModule { }
