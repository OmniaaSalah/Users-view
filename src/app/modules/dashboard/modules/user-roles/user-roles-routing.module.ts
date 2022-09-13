import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserRoleComponent } from './components/new-user-role/new-userrole.component';
import { UserRolesListComponent } from './components/user-roles-list/userroles-list.component';



const routes: Routes = [
  {path:"user-roles-list",component:UserRolesListComponent},
{path:"new-role",component:NewUserRoleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class UserRolesRoutingModule { }
