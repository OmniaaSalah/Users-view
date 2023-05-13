import { NgModule } from '@angular/core';
import { SchoolYearsRoutingModule } from './school-years-routing.module';
import { SchoolyearsListComponent } from './component/school-years-list/schoolyears-list.component';
import { EditNewSchoolyearComponent } from './component/edit-new-school-year/edit-new-schoolyear.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/primng/primeNg.module';
import { ClassDetailsComponent } from './component/class-details/class-details.component';
import { TopStudentsComponent } from './component/top-students/top-students.component';




@NgModule({
  declarations: [SchoolyearsListComponent,
    EditNewSchoolyearComponent,
    ClassDetailsComponent,
    TopStudentsComponent
 ],
  imports: [
    SchoolYearsRoutingModule,
    PrimngModule,
    SharedModule,
  ]
})
export class SchoolYearsModule { }
