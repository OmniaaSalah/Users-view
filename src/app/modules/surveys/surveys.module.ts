import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveysRoutingModule } from './surveys-routing.module';
import { SurveysListComponent } from './components/surveys-list/surveys-list.component';
import { SendSurveyComponent } from './components/send-survey/send-survey.component';
import { SurveyDetailsComponent } from './components/survey-details/survey-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/primeNg/primeNg.module';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { ParentReplySurveyComponent } from './components/parent-reply-survey/parent-reply-survey.component';

import { SurveyRepliesComponent } from './components/survey-replies/survey-replies.component';
import { SurveyFilesComponent } from './components/survey-files/survey-files.component';




@NgModule({
  declarations: [
    SurveysListComponent,
    SendSurveyComponent,
    SurveyDetailsComponent,
    ParentReplySurveyComponent,
    SurveyRepliesComponent,
    SurveyFilesComponent

  ],
  imports: [
    CommonModule,
    SurveysRoutingModule,
    SharedModule,
    PrimngModule,
     NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class SurveysModule { }
