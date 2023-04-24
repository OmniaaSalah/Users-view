import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { AddNewUserInformationComponent } from './components/add-new-user-information/add-new-user-information.component';
import { ViewListOfUsersComponent } from './components/users-list/users-list.component';
import { LayoutComponent } from 'src/app/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children:[
      {path:"users-list",component:ViewListOfUsersComponent, data:{ RouteKey: RouteEnums.Users}},
      {path:"new-user",component:AddNewUserInformationComponent},
      {path:"edit-user/:userId",component:AddNewUserInformationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInformationRoutingModule { }
