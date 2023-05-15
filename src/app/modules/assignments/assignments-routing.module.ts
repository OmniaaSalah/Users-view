import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { AssignmentsListComponent } from './assignments/assignments-list/assignments-list.component';
import { UploadAssignmentComponent } from './assignments/upload-assignment/upload-assignment.component';
import { LayoutComponent } from 'src/app/layout/layout.component';




const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children:[
      { path: 'assignments-list', component: AssignmentsListComponent ,
        data:{
          RouteKey: RouteEnums.Exams,
          title:{ar:'الامتحانات',en: 'Exams'}
        }
      },
      {
        path: 'upload-assignment', component: UploadAssignmentComponent,
        data:{
          title:{ar:'رفع الامتحان',en: 'Upload Exams'}
        }
       }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentRoutingModule { }
