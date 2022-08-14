import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrentUserRoutingModule } from './current-user-routing.module';
import { ParentsComponent } from './components/parents/parents.component';
import { SharjahAuthorityComponent } from './components/sharjah-authority/sharjah-authority.component';
import { SchoolComponent } from './components/school/school.component';
import { CurrentUserComponent } from './current-user.component';


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
    CurrentUserRoutingModule
  ]
})
export class CurrentUserModule { }
