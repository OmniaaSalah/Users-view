import { Component, OnInit } from '@angular/core';
import {  FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { ToastrService } from 'ngx-toastr';

import { QuestionsTypeEnum } from 'src/app/shared/enums/surveys/questions-type.enum';


import { SurveyService } from '../../service/survey.service';


@Component({
  selector: 'app-survey-files',
  templateUrl: './survey-files.component.html',
  styleUrls: ['./survey-files.component.scss']
})
export class SurveyFilesComponent implements OnInit {

  get QuestionsTypeEnum () {return QuestionsTypeEnum}
  survey;
  surveyId=this.route.snapshot.paramMap.get('surveyId');

 
  constructor(


    private route: ActivatedRoute,
    private surveyService:SurveyService,
   ) {
    }
  
  ngOnInit(): void {
  
    this.getResponses();
  }
  getResponses()
  {
   this.surveyService.getAllResponeseOfSurvey(this.surveyId).subscribe((res)=>{this.survey=res.result;})
  }
}