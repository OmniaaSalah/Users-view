import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { EditNewSubjectComponent } from './components/edit-new-subject/edit-new-subject.component';
import { SubjectsComponent } from './components/subjects-list/subjects-list.component';
import { LayoutComponent } from 'src/app/layout/layout.component';




const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children:[
      {path:"subjects-list",component:SubjectsComponent,data:{ RouteKey: RouteEnums.Subjects}},
      {path:"new-subject/school/:schoolId",component:EditNewSubjectComponent},
      {path:"new-subject",component:EditNewSubjectComponent},
      {path:"edit-subject/:subjectId",component:EditNewSubjectComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
