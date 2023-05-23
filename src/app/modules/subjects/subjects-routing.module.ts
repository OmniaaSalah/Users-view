import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { EditNewSubjectComponent } from './components/edit-new-subject/edit-new-subject.component';
import { SubjectsComponent } from './components/subjects-list/subjects-list.component';
import { Layout } from 'src/app/layout/layout-routing.service';




const routes: Routes = [
  Layout.childRoutes([

    {
      path:"subjects-list",component:SubjectsComponent,
      data:{
        RouteKey: RouteEnums.Subjects,
        title:{ar:'المواد الدراسيه',en: 'Subjects'}
      }
    },
    {
      path:"new-subject/school/:schoolId",component:EditNewSubjectComponent,
      data:{
        title:{ar:'اضافة ماده دراسية',en: 'Create Subjects'}
      }
    },
    {
      path:"new-subject",component:EditNewSubjectComponent,
      data:{
        title:{ar:'اضافة ماده دراسية',en: 'Create Subjects'}
      }
    },
    {
      path:"edit-subject/:subjectId",component:EditNewSubjectComponent,
      data:{
        title:{ar:'تعديل مادة دراسيه',en: 'Updata Subjects'}
      }
    }
  ])

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
