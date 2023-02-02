
import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Filtration } from 'src/app/core/classes/filtration';
import { Filter } from 'src/app/core/models/filter/filter';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { QuestionsTypeEnum } from 'src/app/shared/enums/surveys/questions-type.enum';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-survey-replies',
  templateUrl: './survey-replies.component.html',
  styleUrls: ['./survey-replies.component.scss']
})
export class SurveyRepliesComponent implements OnInit {


    showSpinner:boolean=false;
    
    count=0;
    filtration :Filter = {...Filtration}
  openTextDialog=true;
    get QuestionsTypeEnum () {return QuestionsTypeEnum}
    faCheck = faCheck
    survey;
    surveyId=this.route.snapshot.paramMap.get('surveyId');
   
    detailsShown=[];
  
    onTabOpen(e) {
      var index = e.index;
  }
  
  questions={
    total:0,
    totalAllData:0,
    list:[],
    loading:true
  }
    
   
  
    constructor(
      private route: ActivatedRoute,
      private surveyService:SurveyService,
      private layoutService: LayoutService,
      private translate: TranslateService,
      private headerService: HeaderService) { }
  
    ngOnInit(): void {
      console.log("pppp")
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
    console.log( this.filtration.PageSize)
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
        console.log(res.result.choicesPercentage)
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
  
