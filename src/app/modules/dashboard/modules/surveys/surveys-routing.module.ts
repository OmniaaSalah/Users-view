import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { ParentReplySurveyComponent } from './components/parent-reply-survey/parent-reply-survey.component';
import { SendSurveyComponent } from './components/send-survey/send-survey.component';
import { SurveyDetailsComponent } from './components/survey-details/survey-details.component';

import { SurveysListComponent } from './components/surveys-list/surveys-list.component';

const routes: Routes = [

  {path:'' , component: SurveysListComponent,data:{ RouteKey: RouteEnums.Surveys}},
  {path:'new-survey' , component: SurveyDetailsComponent},
  {path:'send-survey' , component: SendSurveyComponent},
 // {path:'survey-details' , component: SurveyDetailsComponent}
  {path:"Survey/:surveyId",component:SurveyDetailsComponent},
  {path:"reply-survey/:surveyId",component:ParentReplySurveyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveysRoutingModule { }
