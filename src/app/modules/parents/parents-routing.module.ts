import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterRequestComponent } from 'src/app/shared/components/register-request/register-request.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ParentsComponent } from './parents.component';

const routes: Routes = [
  { path: '', component: ParentsComponent, children:[
    { path:'child/:id/register-request', component: RegisterRequestComponent},
    { path:'profile', component: ProfileComponent},
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
