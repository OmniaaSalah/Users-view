import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolYearsRoutingModule } from './school-years-routing.module';

import { SchoolyearsListComponent } from './component/school-years-list/schoolyears-list.component';
import { EditNewSchoolyearComponent } from './component/edit-new-school-year/edit-new-schoolyear.component';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TranslateModule } from '@ngx-translate/core';

import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { ClassDetailsComponent } from './component/class-details/class-details.component';
import { TopStudentsComponent } from './component/top-students/top-students.component';
import { SchoolYearFormComponent } from './component/school-year-form/school-year-form.component';



@NgModule({
  declarations: [SchoolyearsListComponent,
    EditNewSchoolyearComponent,
    ClassDetailsComponent,
    TopStudentsComponent,
    SchoolYearFormComponent],
  imports: [
    CommonModule,
    SchoolYearsRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    PrimngModule,
    TranslateModule,
    SharedModule,
    ToastrModule
  ]
})
export class SchoolYearsModule { }
