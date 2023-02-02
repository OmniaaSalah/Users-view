import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterRequestComponent } from 'src/app/shared/components/register-request/register-request.component';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { ChildDetailsComponent } from './components/child-details/child-details.component';
import { ChildrenListComponent } from './components/children-list/children-list.component';
import { ParantsComponent } from './components/parents-list/parants.component';
import { UnregisterChildComponent } from './components/unregister-child/unregister-child.component';

const routes: Routes = [
  { path: '', component: ParantsComponent, data:{ RouteKey: RouteEnums.Guardians}},
  { path: 'parent/:parentId/all-children', component: ChildrenListComponent, children:[] },
  { path: 'parent/:parentId/child/:childId', component: ChildDetailsComponent },
  { path: 'parent/:parentId/child/:id/unregister-child', component: UnregisterChildComponent },
  { path: 'parent/:parentId/child/:childId/register', component: RegisterRequestComponent }

  // { path: 'parent/:parentId/child/:childId/register', loadChildren: () => import('./components/spea-register-child/spea-register-child.module').then(m => m.SpeaRegisterChildModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentsRoutingModule { }
