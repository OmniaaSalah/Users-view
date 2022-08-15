import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrentUserRoutingModule } from './current-user-routing.module';
import { ParentsComponent } from './components/parents/parents.component';
import { SharjahAuthorityComponent } from './components/sharjah-authority/sharjah-authority.component';
import { SchoolComponent } from './components/school/school.component';
import { CurrentUserComponent } from './current-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from '../primng/primng.module';


@NgModule({
  declarations: [
    CurrentUserComponent,
    ParentsComponent,
    SharjahAuthorityComponent,
    SchoolComponent,
    CurrentUserComponent
  ],
  imports: [
    CommonModule,
    CurrentUserRoutingModule,
    SharedModule,
    PrimngModule
  ]
})
export class CurrentUserModule { }
