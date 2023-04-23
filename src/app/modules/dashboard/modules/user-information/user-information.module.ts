import { NgModule } from '@angular/core';
import { UserInformationRoutingModule } from './user-information-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/shared/primng/shared-primng.module';
import { ViewListOfUsersComponent } from './components/users-list/users-list.component';
import { AddNewUserInformationComponent } from './components/add-new-user-information/add-new-user-information.component';


@NgModule({
  declarations: [ViewListOfUsersComponent, AddNewUserInformationComponent],
  imports: [
    UserInformationRoutingModule,
    PrimngModule,
    SharedModule ,

  ]
})
export class UserInformationModule { }
