import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentsRoutingModule } from './guardian-routing.module';
import { GuardianComponent } from './guardian.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/primeNg/primeNg.module';
import { ProfileComponent } from './components/profile/profile.component';
import { MandatorySurveyComponent } from './components/mandatory-survey/mandatory-survey.component';
import { SurveysModule } from '../surveys/surveys.module';



@NgModule({
  declarations: [
    GuardianComponent,
    ProfileComponent,
    MandatorySurveyComponent,
  ],
  imports: [
    CommonModule,
    ParentsRoutingModule,
    SharedModule,
    PrimngModule,
    SurveysModule
  ]
})
export class GuardianModule { }
