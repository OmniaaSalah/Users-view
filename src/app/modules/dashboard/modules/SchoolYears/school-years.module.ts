import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimngModule } from '../../../primng/primng.module';
import { SchoolYearsRoutingModule } from './school-years-routing.module';
import { ViewSchoolYearsListComponent } from './components/view-school-years-list/view-school-years-list.component';
import { EditAddNewSchoolYearComponent } from './components/edit-add-new-school-year/edit-add-new-school-year.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ViewSchoolYearsListComponent,
    EditAddNewSchoolYearComponent
  ],
  imports: [
    CommonModule,
    SchoolYearsRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    PrimngModule ,
   TranslateModule,
    SharedModule,
  ]
})
export class SchoolYearsModule { }
