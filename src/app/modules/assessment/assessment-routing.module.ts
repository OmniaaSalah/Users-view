import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { AssessmentsListComponent } from './components/assessments-list/assessments-list.component';
import { EditNewAssessmentComponent } from './components/edit-new-assessment/edit-new-assessment.component';
import { LayoutComponent } from 'src/app/layout/layout.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children:[
      {
        path:"assements-list",component:AssessmentsListComponent,
        data:{
          RouteKey: RouteEnums.Assessments,
          title:{ar:'تقيمات المواد الدراسيه',en: 'Subjects rates'}
        }
      },
      {
        path:"new-assessment",component:EditNewAssessmentComponent,
        data:{
          title:{ar:'اضافة تقيم مادة دراسية',en: 'Create Subject Rate'}
        }
      },
      {
        path:"edit-assessment/:id",component:EditNewAssessmentComponent,
        data:{
          title:{ar:'تعديل تقيم مادة دراسية',en: 'Update Subject Rate'}
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule { }
