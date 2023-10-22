import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheeckMandatoryServeyGuard } from 'src/app/core/guards/check-mandatory-servey.guard';
import { RegisterRequestComponent } from 'src/app/shared/components/register-request/register-request.component';
import { ChildDetailsComponent } from '../parants/components/child-details/child-details.component';
import { WithdrawalRequestComponent } from '../shared/components/register-child/withdrawal-request/withdrawal-request.component';
import { ParentReplySurveyComponent } from '../surveys/components/parent-reply-survey/parent-reply-survey.component';
import { MandatorySurveyComponent } from './components/mandatory-survey/mandatory-survey.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GuardianComponent } from './guardian.component';
import { Layout } from 'src/app/layout/layout-routing.service';
import { UnregisterChildComponent } from '../parants/components/unregister-child/unregister-child.component';
import { StudentDetailsComponent } from '../shared/components/register-child/student-details.component';

const routes: Routes = [
  Layout.childRoutes([
    {
      path: '', component: GuardianComponent,
      children:[

        {
          path:'',
          canActivate: [CheeckMandatoryServeyGuard],
          children: [

            {
              path:'child/:childId/register-request', component: RegisterRequestComponent,
              data:{
                title:{ar:'طلب تسجيل',en: 'Registed Request'}
              }
            },

            {
              path:'profile', component: ProfileComponent ,
              data:{
                title:{ar:'حسابى',en: 'My Profile'}
              }
            },
            // {
            //   path: ':parentId/child/:childId'  , component:ChildDetailsComponent ,
            //      data:{
            //     title:{ar:'تفاصيل الابن',en: 'Child Details'}
            //   }
            // },

             // ---------------------------------------------
            {
              path: ':parentId/child/:childId', component: UnregisterChildComponent,
              data:{
                title:{ar:'تفاصيل الابن',en: 'Child Details'}
              }
            },
            {
              path: ':parentId/student/:childId', component: StudentDetailsComponent,
              data:{
                title:{ar:'تفاصيل الابن',en: 'Child Details'}
              }
            },
            // ---------------------------------------------

            {
              path: ":parentId/child/:childId/withdraw-request", component: WithdrawalRequestComponent ,
              data:{
                title:{ar:'طلب انسحاب',en: 'Withdraw Request'}
              }
            },

            {
              path: 'AddChild',
              loadChildren: () => import('./components/add-new-child/add-new-child.module').then(m => m.AddNewChildModule),
              data:{
                title:{ar:'اضافة ابن جديد',en: 'Add New Child'}
              }
            },
          ]
        },


        {path:'mandatory-survey',component:MandatorySurveyComponent},
        {path:'mandatory-survey/reply-survey/:surveyId',component:ParentReplySurveyComponent},
      ]
    },
  ])




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentsRoutingModule { }
