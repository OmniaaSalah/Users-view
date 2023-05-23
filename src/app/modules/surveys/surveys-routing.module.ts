import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimsGuard } from 'src/app/core/guards/claims.guard';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { ParentReplySurveyComponent } from './components/parent-reply-survey/parent-reply-survey.component';
import { SendSurveyComponent } from './components/send-survey/send-survey.component';
import { SurveyDetailsComponent } from './components/survey-details/survey-details.component';

import { SurveysListComponent } from './components/surveys-list/surveys-list.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { Layout } from 'src/app/layout/layout-routing.service';

const routes: Routes = [
  Layout.childRoutes([
    {path:'' , component: SurveysListComponent,data:{ RouteKey: RouteEnums.Surveys,allowedClaims: ClaimsEnum.S_MenuItem_Survey} },
    {path:'new-survey' , component: SurveyDetailsComponent ,data:{allowedClaims: ClaimsEnum.S_MenuItem_Survey}},
    {path:'send-survey' , component: SendSurveyComponent ,data:{allowedClaims: ClaimsEnum.S_MenuItem_Survey}},
    {path:"Survey/:surveyId",component:SurveyDetailsComponent,data:{allowedClaims: ClaimsEnum.S_MenuItem_Survey}},
    {path:"reply-survey/:surveyId",component:ParentReplySurveyComponent}
  ])


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveysRoutingModule { }
