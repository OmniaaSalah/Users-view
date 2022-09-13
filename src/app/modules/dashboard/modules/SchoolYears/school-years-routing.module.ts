import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAddNewSchoolYearComponent } from './components/edit-add-new-school-year/edit-add-new-school-year.component';
import { ViewSchoolYearsListComponent } from './components/view-school-years-list/view-school-years-list.component';

const routes: Routes = [
{path:"View-SchoolYears-List",component:ViewSchoolYearsListComponent},
{path:"New-SchoolYear",component:EditAddNewSchoolYearComponent},
{path:"Edit-SchoolYear/:SYID",component:EditAddNewSchoolYearComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolYearsRoutingModule { }
