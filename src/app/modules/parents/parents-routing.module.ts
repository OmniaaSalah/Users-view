import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterRequestComponent } from 'src/app/shared/components/register-request/register-request.component';
import { ChildDetailsComponent } from '../dashboard/modules/parants/components/child-details/child-details.component';
import { UnregisterChildComponent } from '../dashboard/modules/parants/components/unregister-child/unregister-child.component';
import { SchoolyearsListComponent } from '../dashboard/modules/school-years/component/school-years-list/schoolyears-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ParentsComponent } from './parents.component';

const routes: Routes = [
  { path: '', component: ParentsComponent, children:[
    { path:'child/:childId/register-request', component: RegisterRequestComponent},
    { path:'profile', component: ProfileComponent},
    { path: ':parentId/child/:childId'  , component:ChildDetailsComponent },
    {
      path: 'AddChild',
      loadChildren: () => import('./components/add-new-child/add-new-child.module').then(m => m.AddNewChildModule)
    },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentsRoutingModule { }
