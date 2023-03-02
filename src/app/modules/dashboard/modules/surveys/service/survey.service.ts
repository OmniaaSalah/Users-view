import { Injectable,inject } from '@angular/core';
import { finalize, Observable, take } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { ISurvey } from 'src/app/core/Models/ISurvey';
import { IAddSurvey } from 'src/app/core/Models/IAddSurvey';

import { Filter } from 'src/app/core/models/filter/filter';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { IEditNewSurvey } from 'src/app/core/Models/Survey/IEditNewSurvey';
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
  baseUrl = environment.serverUrl;
  private headers = new HttpHeaders();
  constructor(private translate:TranslateService,private _http: HttpClient,private http: HttpHandlerService, private tableLoaderService: LoaderService) {
    this.surveyType = [
      { name:this.translate.instant('dashboard.surveys.mandatory'), value:StatusEnum.Mandatory },
      { name:this.translate.instant('dashboard.surveys.optional'), value: StatusEnum.Optional }
    ];
    this.questionType=[
      { name:this.translate.instant('dashboard.surveys.SurveyAttachmentQuestion'), value:QuestionsTypeEnum.SurveyAttachmentQuestion },
      { name:this.translate.instant('dashboard.surveys.SurveyFreeTextQuestion'), value: QuestionsTypeEnum.SurveyFreeTextQuestion },
      { name:this.translate.instant('dashboard.surveys.SurveyMultiChoiceQuestion'), value:QuestionsTypeEnum.SurveyMultiChoiceQuestion },
      { name:this.translate.instant('dashboard.surveys.SurveyRateQuestion'), value: QuestionsTypeEnum.SurveyRateQuestion }
    ]
    this.surveyStatus= [
      { name:this.translate.instant('dashboard.surveys.New'), value:StatusEnum.New },
      { name:this.translate.instant('dashboard.surveys.Sent'), value: StatusEnum.Sent },
      { name:this.translate.instant('dashboard.surveys.Closed'), value:StatusEnum.Closed },
      { name:this.translate.instant('dashboard.surveys.Apparent'), value: StatusEnum.Apparent},
      { name:this.translate.instant('dashboard.surveys.Canceled'), value: StatusEnum.Canceled}
    ]

  }

  GetCurriculumList(keyword:string ,sortby:string ,page :number , pagesize :number , sortcolumn:string , sortdirection:string) {
    let params = new HttpParams();
    if(page !== null && pagesize !== null ){
      params = params.append('keyword' , keyword.toString());
      params = params.append('sortby' , sortby.toString());
      params = params.append('page' , page.toString());
      params = params.append('pagesize' , pagesize.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortdirection' , sortdirection.toString());
    }
    return this.http.get(`${this.baseUrl+'/Curriculum'}`,params).pipe(
      map(response => {
         return response ;
      })
    )
  }

  GetSchoolsList(curriculumId:number) {
    let params = new HttpParams();
    if(curriculumId !== null && curriculumId !== undefined ){
      params = params.append('curriculumId' , curriculumId.toString());
      return this._http.get<any>(`${this.baseUrl}`+'/School', {observe:'response' , params}).pipe(
        map(response => {
           return response.body ;
        })
      )
    }else{
      return this._http.get<any>(`${this.baseUrl+'/School'}`, {observe:'response'}).pipe(
        map(response => {
           return response.body ;
        })
      )
    }

  }

  GetGradeList(): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}` + `/Grade`);
  }

  GetSubjectList(): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}` + `/Subject`);
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

  // getSurveyList(keyword:string ,sortby:string ,page :number , pagesize :number , sortcolumn:string , sortdirection:string) {
  //   let params = new HttpParams();
  //   if(page !== null && pagesize !== null ){
  //     params = params.append('keyword' , keyword.toString());
  //     params = params.append('sortby' , sortby.toString());
  //     params = params.append('page' , page.toString());
  //     params = params.append('pagesize' , pagesize.toString());
  //     params = params.append('sortcolumn' , sortcolumn.toString());
  //     params = params.append('sortdirection' , sortdirection.toString());
  //   }
  //   return this._http.get<any>(`${this.baseUrl}`+'/Survey', {observe:'response' , params}).pipe(
  //     map(response => {
  //        return response.body ;
  //     })
  //   )
  // }

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
getGuardians(filter?:Partial<Filter>)
{
 
  this.tableLoaderService.isLoading$.next(true)

  return this.http.get('/Survey/guardian/search',filter)
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

getResponeseOfSurvey(surveyId,filter?:Partial<Filter>)
{
  return this.http.get(`/Survey/answers-datails/${surveyId}`,filter);
}
getDetailsOfResponeseOfSurvey(surveyId,questionId)
{
  return this.http.get(`${'/Survey/answers-datails/'+surveyId+'/'+questionId}`);
}

// checkMandatitoryOfSurvey(guardianId)
//  {
//   /api/Survey/gurdian-required-surveys
//   return this.http.get(`${'/Survey/gurdian-required-surveys/'}`);
//  }

  surveyToExport(filter){
    return this.http.post('/Survey/Search',filter)
    .pipe(
      map(res=>{
        return res.result.data.map(survey =>{
          return {
            [this.translate.instant('dashboard.surveys.surveyNumber')]: survey?.surveyNumber,
            [this.translate.instant('dashboard.surveys.surveyAddress')]: survey?.title[this.lang],
            [this.translate.instant('dashboard.surveys.surveyType')]: survey?.surveyType==StatusEnum.Mandatory ? this.translate.instant('dashboard.surveys.mandatory'):this.translate.instant('dashboard.surveys.optional'),
            [this.translate.instant('dashboard.Subjects.Created by')]: survey?.userName[this.lang],
            [this.translate.instant('dashboard.surveys.targets')]: survey?.targetGuardians,
            [this.translate.instant('dashboard.surveys.responses')]: survey?.responsesTotalNumber,
            [this.translate.instant('dashboard.surveys.surveyStatus')]: this.translate.instant('dashboard.surveys.'+survey?.surveyStatus)

          }
        })
      }))
  }

}