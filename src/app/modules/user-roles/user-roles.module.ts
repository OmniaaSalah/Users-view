import { NgModule } from '@angular/core';
import { UserRolesRoutingModule } from './user-roles-routing.module';
import { PrimngModule } from 'src/app/primeNg/primeNg.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRolesListComponent } from './components/user-roles-list/userroles-list.component';
import { NewUserRoleComponent } from './components/new-user-role/new-userrole.component';
import { RoleDetailsComponent } from './components/role-details/role-details.component';



@NgModule({
  declarations: [UserRolesListComponent,
    NewUserRoleComponent,
    RoleDetailsComponent],
  imports: [
    UserRolesRoutingModule,
    PrimngModule,
    SharedModule,

  ]
})
export class UserRolesModule { }
