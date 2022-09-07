import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRolesRoutingModule } from './user-roles-routing.module';
import { ViewUserRolesComponent } from './components/view-user-roles/view-user-roles.component';
import { NewUserRoleComponent } from './components/new-user-role/new-user-role.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [ViewUserRolesComponent,
    NewUserRoleComponent],
  imports: [
    CommonModule,
    UserRolesRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    PrimngModule,
    TranslateModule,
    SharedModule,
    ToastrModule

  ]
})
export class UserRolesModule { }
