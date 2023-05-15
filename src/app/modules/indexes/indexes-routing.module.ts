import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { EditNewIndexComponent } from './components/edit-new-Index/edit-new-index.component';
import { IndexesComponent } from './components/indexes-list/indexes-list.component';
import { LayoutComponent } from 'src/app/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children:[
      {

        path: "indexes-list", component: IndexesComponent,
        data:{
          RouteKey: RouteEnums.Indexes,
          title:{ar:'فهارس النظام',en: 'Indexes List'}
        }
      },
      {

        path: "new-index", component: EditNewIndexComponent ,
        data:{
          title:{ar:'اضافه فهرس',en: 'Create Indexes'}
        }
      },
      {

        path: "edit-index/:indexId", component: EditNewIndexComponent,
        data:{
          title:{ar:'تعديل فهرس',en: 'Update Indexes'}
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexesRoutingModule { }
