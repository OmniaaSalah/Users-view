import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassDetailsComponent } from './component/class-details/class-details.component';
import { EditNewSchoolyearComponent } from './component/edit-new-school-year/edit-new-schoolyear.component';
import { SchoolyearsListComponent } from './component/school-years-list/schoolyears-list.component';

const routes: Routes = [
  {path:"school-years-list",component:SchoolyearsListComponent},
  {path:"new-school-year",component:EditNewSchoolyearComponent},
  {path:"display-school-year/:schoolyearId",component:EditNewSchoolyearComponent},
  {path:"new-school-year/class-details",component:ClassDetailsComponent},
  {path:"display-school-year/:schoolyearId/curriculum/:curriculumId/class-details/:classId",component:ClassDetailsComponent},
  {path:"new-school-year/curriculum/:curriculumId/class-details/:classId",component:ClassDetailsComponent},
  {path:"display-school-year/:schoolyearId/class-details",component:ClassDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolYearsRoutingModule { }
