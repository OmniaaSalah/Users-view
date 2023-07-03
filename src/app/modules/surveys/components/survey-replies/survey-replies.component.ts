
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filtration } from 'src/app/core/helpers/filtration';
import { Filter } from 'src/app/core/models/filter/filter';
import { QuestionsTypeEnum } from 'src/app/shared/enums/surveys/questions-type.enum';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-survey-replies',
  templateUrl: './survey-replies.component.html',
  styleUrls: ['./survey-replies.component.scss']
})
export class SurveyRepliesComponent implements OnInit {
    showSpinner:boolean=false;
    filtration :Filter = {...Filtration}
    get QuestionsTypeEnum () {return QuestionsTypeEnum}
    survey;
    surveyId=this.route.snapshot.paramMap.get('surveyId');
    questions={
      total:0,
      totalAllData:0,
      list:[],
      loading:true
    }



    constructor(
      private route: ActivatedRoute,
      private surveyService:SurveyService) { }

    ngOnInit(): void {

      this.filtration.PageSize=0;
      this.getResponses();

    }

    paginationChanged(e) {

    }

   getResponses()
   {
    this.showSpinner = false
    this.filtration.Page = 1
    this.filtration.PageSize+=10;
    this.surveyService.getResponeseOfSurvey(this.surveyId,this.filtration).subscribe((res)=>{
      this.survey=res.result;
      this.questions.list=res.result.surveyQuestionReport.data;
      this.questions.total=res.result.surveyQuestionReport.total;
      this.questions.totalAllData=res.result.surveyQuestionReport.totalAllData;
      this.showSpinner = true;
    });
   }

   exportPdf(fileUrl : string): void {
    if (fileUrl) {
      window.open(fileUrl, '_blank').focus();
    }
   }

   openRow(questionId)
   {
    this.questions.list.find(c=>c.id==questionId).loading = true;

    this.getDetailsOfQuestion(questionId);

   }



    getDetailsOfQuestion(questionId)
    {
      this.surveyService.getDetailsOfResponeseOfSurvey(this.surveyId,questionId).subscribe((res)=>{

        this.questions.list.find(c=>c.id==questionId).loading = false;
        this.questions.list.find(c=>c.id==questionId).parents=res.result.parentsWhoAnswered;
        this.questions.list.find(c=>c.id==questionId).choices=res.result.choicesPercentage

      })



    }
    closeRow()
    {

    }

    onScroll()
    {


      if(this.questions.list.length<this.questions.totalAllData){

          this.loadMore();
      }
    }

    loadMore()
    {

      this.getResponses();
    }

  }

