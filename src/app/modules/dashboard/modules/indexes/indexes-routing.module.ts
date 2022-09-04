import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditNewIndexComponent } from './components/edit-new-Index/edit-new-index.component';
import { IndexesComponent } from './components/View-List-Of-Indexes/indexes.component';

const routes: Routes = [
  {path:"View-SystemList",component:IndexesComponent},
{path:"New-Index",component:EditNewIndexComponent},
{path:"Edit-Index/:In",component:EditNewIndexComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexesRoutingModule { }
