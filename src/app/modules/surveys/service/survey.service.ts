import { Injectable,inject } from '@angular/core';
import { finalize, Observable, take } from 'rxjs';
import {  HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { TranslateService } from '@ngx-translate/core';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { QuestionsTypeEnum } from 'src/app/shared/enums/surveys/questions-type.enum';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  lang = inject(TranslationService).lang
  surveyType=[];
  questionType=[];
  surveyStatus=[];
  constructor(private translate:TranslateService,private http: HttpHandlerService, private tableLoaderService: LoaderService) {
    this.surveyType = [
      { name:this.translate.instant('surveys.mandatory'), value:StatusEnum.Mandatory },
      { name:this.translate.instant('surveys.optional'), value: StatusEnum.Optional }
    ];
    this.questionType=[
      { name:this.translate.instant('surveys.SurveyAttachmentQuestion'), value:QuestionsTypeEnum.SurveyAttachmentQuestion },
      { name:this.translate.instant('surveys.SurveyFreeTextQuestion'), value: QuestionsTypeEnum.SurveyFreeTextQuestion },
      { name:this.translate.instant('surveys.SurveyMultiChoiceQuestion'), value:QuestionsTypeEnum.SurveyMultiChoiceQuestion },
      { name:this.translate.instant('surveys.SurveyRateQuestion'), value: QuestionsTypeEnum.SurveyRateQuestion }
    ]
    this.surveyStatus= [
      { name:this.translate.instant('surveys.Draft'), value:StatusEnum.Draft },
      { name:this.translate.instant('surveys.Sent'), value: StatusEnum.Sent },
      { name:this.translate.instant('surveys.Closed'), value:StatusEnum.Closed },
      { name:this.translate.instant('surveys.Apparent'), value: StatusEnum.Apparent},
      { name:this.translate.instant('surveys.Canceled'), value: StatusEnum.Canceled}
    ]

  }



  getSurveyList(filter?){
    this.tableLoaderService.isLoading$.next(true)

    return this.http.post('/Survey/Search',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }


  getSurveyById(id:number): Observable<any>{
    return this.http.get(`${'/Survey/'+id}`);
  }
  addSurvey(survey: any): Observable<any> {
    return this.http.post(`/Survey`,survey);
  }
  _headers = new HttpHeaders({
    'Accept': 'application/json',
    'zumo-api-version': '2.0.0',

});


editsurvey(survey: any,id : number ,): Observable<any> {
  return this.http.put(`/Survey/${id}`,survey);
}

sendSurvey(data: any): Observable<any> {
  return this.http.post(`/Survey/send-survey`, data);
}

sendParentSurvey(data){
  return this.http.post('/Survey/survey-response',data);
}
getGuardians(filter?:Partial<SearchModel>)
{

  this.tableLoaderService.isLoading$.next(true)

  return this.http.post('/Survey/guardian/search',filter)
  .pipe(
    take(1),
    finalize(()=> {
      this.tableLoaderService.isLoading$.next(false)
    }))
}

updateCancelStatus(surveyId)
{
  return this.http.get(`/Survey/cancel/${surveyId}`);
}

getSurveytoResponse(surveyId,currentGuardianId)
{
  return this.http.get(`${'/Survey/guardian-survey/'+surveyId+'/'+currentGuardianId}`);
}

markSurveyAsOpened(surveyId,currentGuardianId)
{
  return this.http.get(`${'/Survey/guardian-survey/opened/'+surveyId+'/'+currentGuardianId}`);
}

getAllResponeseOfSurvey(surveyId)
{
  return this.http.get(`${'/Survey/full-report/'+surveyId}`);
}

getResponeseOfSurvey(surveyId,filter?:Partial<SearchModel>)
{
  return this.http.get(`/Survey/answers-datails/${surveyId}`,filter);
}
getDetailsOfResponeseOfSurvey(surveyId,questionId)
{
  return this.http.get(`${'/Survey/answers-datails/'+surveyId+'/'+questionId}`);
}

  surveyToExport(filter){
    return this.http.post('/Survey/Search',filter)
    .pipe(
      map(res=>{
        return res.result.data.map(survey =>{
          return {
            [this.translate.instant('surveys.surveyNumber')]: survey?.surveyNumber,
            [this.translate.instant('surveys.surveyAddress')]: survey?.title[this.lang],
            [this.translate.instant('surveys.surveyType')]: survey?.surveyType==StatusEnum.Mandatory ? this.translate.instant('surveys.mandatory'):this.translate.instant('surveys.optional'),
            [this.translate.instant('Subjects.Created by')]: survey?.userName[this.lang],
            [this.translate.instant('surveys.targets')]: survey?.targetGuardians,
            [this.translate.instant('surveys.responses')]: survey?.responsesTotalNumber,
            [this.translate.instant('surveys.surveyStatus')]: this.translate.instant('surveys.'+survey?.surveyStatus)

          }
        })
      }))
  }

}
