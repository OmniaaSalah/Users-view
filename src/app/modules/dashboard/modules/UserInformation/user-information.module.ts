import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInformationRoutingModule } from './user-information-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { PrimngModule } from 'src/app/modules/primng/primng.module';

import { ViewListOfUsersComponent } from './components/view-list-of-users/view-list-of-users.component';
import { AddEditUserInformationComponent } from './components/add-edit-user-information/add-edit-user-information.component';


@NgModule({
  declarations: [ViewListOfUsersComponent,AddEditUserInformationComponent],
  imports: [
    CommonModule,
    UserInformationRoutingModule,
    NgxPaginationModule,
    PrimngModule,
   SharedModule ,
   FormsModule,
   FontAwesomeModule,
   HttpClientModule,
   TranslateModule
  
  ]
})
export class UserInformationModule { }
