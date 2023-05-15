import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { ClassDetailsComponent } from './component/class-details/class-details.component';
import { EditNewSchoolyearComponent } from './component/edit-new-school-year/edit-new-schoolyear.component';
import { SchoolyearsListComponent } from './component/school-years-list/schoolyears-list.component';
import { LayoutComponent } from 'src/app/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children:[
      {
        path:"school-years-list",component:SchoolyearsListComponent,
        data:{
          RouteKey: RouteEnums.SchoolYears,
          title:{ar:'السنوات الدراسية',en: 'School Years'}
        }

      },
      {
        path:"new-school-year",component:EditNewSchoolyearComponent,
        data:{title:{ar:'اضافه سنه دراسية',en: 'School Years'}}
      },
      {
        path:"display-school-year/:schoolyearId",component:EditNewSchoolyearComponent,
        data:{title:{ar:'تعديل سنه دراسيه',en: 'Update School Years'}}
      },
      {
        path:"new-school-year/class-details",component:ClassDetailsComponent,
        data:{title:{ar:'اضافه صفوف السنه الدراسيه',en: 'Create new School Years'}}
      },
      {
        path:"display-school-year/:schoolyearId/curriculum/:curriculumId/class-details/:classId",component:ClassDetailsComponent,
        data:{title:{ar:'تعديل صفوف السنه الدراسيه',en: 'Update School Years Grades'}}
      },
      {
        path:"new-school-year/curriculum/:curriculumId/class-details/:classId",component:ClassDetailsComponent,
        data:{title:{ar:'اضافه صفوف السنه الدراسيه',en: 'Update School Years Grades'}}
      },
      {
        path:"display-school-year/:schoolyearId/class-details",component:ClassDetailsComponent,
        data:{title:{ar:'اضافه صفوف السنه الدراسيه',en: 'Update School Years Grades'}}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolYearsRoutingModule { }
