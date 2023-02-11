import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheeckMandatoryServeyGuard } from 'src/app/core/services/guards/check-mandatory-servey.guard';
import { RegisterRequestComponent } from 'src/app/shared/components/register-request/register-request.component';
import { ChildDetailsComponent } from '../dashboard/modules/parants/components/child-details/child-details.component';
import { ParentReplySurveyComponent } from '../dashboard/modules/surveys/components/parent-reply-survey/parent-reply-survey.component';
import { MandatorySurveyComponent } from './components/mandatory-survey/mandatory-survey.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GuardianComponent } from './guardian.component';

const routes: Routes = [
  {path:'mandatory-survey',component:MandatorySurveyComponent},
  {path:'mandatory-survey/reply-survey/:surveyId',component:ParentReplySurveyComponent},
  { path: '', component: GuardianComponent, children:[
    { path:'child/:childId/register-request', component: RegisterRequestComponent},
    { path:'profile', component: ProfileComponent},
    { path: ':parentId/child/:childId'  , component:ChildDetailsComponent },
    {
      path: 'AddChild',
      loadChildren: () => import('./components/add-new-child/add-new-child.module').then(m => m.AddNewChildModule)
    },
    {
      path: 'requests-list',
      loadChildren: () => import('../dashboard/modules/request-list/request-list.module').then(m => m.RequestListModule)
    },
  ] ,canActivate: [CheeckMandatoryServeyGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentsRoutingModule { }
