import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheeckMandatoryServeyGuard } from 'src/app/core/guards/check-mandatory-servey.guard';
import { RegisterRequestComponent } from 'src/app/shared/components/register-request/register-request.component';
import { ChildDetailsComponent } from '../dashboard/parants/components/child-details/child-details.component';
import { WithdrawalRequestComponent } from '../dashboard/shared/components/register-child/withdrawal-request/withdrawal-request.component';
import { ParentReplySurveyComponent } from '../dashboard/surveys/components/parent-reply-survey/parent-reply-survey.component';
import { MandatorySurveyComponent } from './components/mandatory-survey/mandatory-survey.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GuardianComponent } from './guardian.component';
import { LayoutComponent } from 'src/app/layout/layout.component';

const routes: Routes = [

  {path:'', component: LayoutComponent,
    children:[

      {
        path: '', component: GuardianComponent,
        children:[

          {
            path:'',
            canActivate: [CheeckMandatoryServeyGuard],
            children: [

              { path:'child/:childId/register-request', component: RegisterRequestComponent },

              { path:'profile', component: ProfileComponent },
              { path: ':parentId/child/:childId'  , component:ChildDetailsComponent },
              { path: ":parentId/child/:childId/withdraw-request", component: WithdrawalRequestComponent },

              {
                path: 'AddChild',
                loadChildren: () => import('./components/add-new-child/add-new-child.module').then(m => m.AddNewChildModule)
              },
            ]
          },


          {path:'mandatory-survey',component:MandatorySurveyComponent},
          {path:'mandatory-survey/reply-survey/:surveyId',component:ParentReplySurveyComponent},
        ]
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentsRoutingModule { }
