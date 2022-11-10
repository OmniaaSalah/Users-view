import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { ISurvey } from 'src/app/core/Models/ISurvey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  baseUrl = environment.serverUrl;
  private headers = new HttpHeaders();
  constructor(private _http: HttpClient,private http: HttpHandlerService) {

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

  getSurveyList(keyword:string ,sortby:string ,page :number , pagesize :number , sortcolumn:string , sortdirection:string) {
    let params = new HttpParams();
    if(page !== null && pagesize !== null ){
      params = params.append('keyword' , keyword.toString());
      params = params.append('sortby' , sortby.toString());
      params = params.append('page' , page.toString());
      params = params.append('pagesize' , pagesize.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortdirection' , sortdirection.toString());
    }
    return this._http.get<any>(`${this.baseUrl}`+'/Survey', {observe:'response' , params}).pipe(
      map(response => {
         return response.body ;
      })
    )
  }
  getSurveyById(id:number): Observable<any>{
    return this.http.get(`${'/Survey/'+id}`);
  }
  AddSurvey(data: any): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}`+'/Survey', data);
  }
  _headers = new HttpHeaders({
    'Accept': 'application/json',
    'zumo-api-version': '2.0.0',

});

}

