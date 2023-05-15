import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { NewUserRoleComponent } from './components/new-user-role/new-userrole.component';
import { RoleDetailsComponent } from './components/role-details/role-details.component';
import { UserRolesListComponent } from './components/user-roles-list/userroles-list.component';
import { LayoutComponent } from 'src/app/layout/layout.component';



const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children:[
      {
        path:"user-roles-list",component:UserRolesListComponent,
        data:{
          RouteKey: RouteEnums.Roles,
          title:{ar:'الادوار الوظيفية',en: 'User Roles'}
        },
      },
      {
        path:"new-role",component:NewUserRoleComponent,
        data:{
          title:{ar:'اضافة دور وظيفى',en: 'User Roles'}
        },
      },
      {
        path:"edit-role/:roleId",component:NewUserRoleComponent,
        data:{
          title:{ar:'تعديل دور وظيفى',en: 'User Roles'}
        },
      },
      {
        path:"role-details/:roleId", component:RoleDetailsComponent,
        data:{
          title:{ar:'تفاصيل دور وظيفى',en: 'User Roles'}
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class UserRolesRoutingModule { }
