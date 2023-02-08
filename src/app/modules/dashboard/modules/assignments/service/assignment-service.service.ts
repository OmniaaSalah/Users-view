import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map ,finalize, Observable, take,} from 'rxjs';
import { IuploadAssignment } from '../../../../../core/Models/IuploadAssignment';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { TranslateService } from '@ngx-translate/core';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { getLocalizedValue } from 'src/app/core/classes/helpers';

@Injectable({
  providedIn: 'root'
})
export class AssignmentServiceService {
  baseUrl = environment.serverUrl;
  examStatusList;
  private headers = new HttpHeaders();
  constructor(private _http: HttpClient,private http: HttpHandlerService, private tableLoaderService: LoaderService,private translate:TranslateService) {

     this.examStatusList=[{id:1,name:{ar:"متاح",en:"Available"}},{id:2,name:{ar:"غير متاح",en:"Unavailable"}}]
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

  getAssignmentList(filter) {
    this.tableLoaderService.isLoading$.next(true);
    return this.http.get(`/Exam`,filter).pipe(take(1),finalize(()=> {
      this.tableLoaderService.isLoading$.next(false)
    }));
  }

  assignmentsToExport(filter){
    return this.http.get('/Exam',filter)
    .pipe(
      map(res=>{
        return res.data.map(assignment =>{
          return {
            [this.translate.instant('dashboard.Assignments.Assignment Name')]: assignment.name.ar,
            [this.translate.instant('shared.school')]: getLocalizedValue(assignment.schoolName),
            [this.translate.instant('dashboard.Assignments.Class')]: getLocalizedValue(assignment.gradeName),
            [this.translate.instant('dashboard.Assignments.curriculum')]: getLocalizedValue(assignment.curriculmName),
            [this.translate.instant('dashboard.Assignments.schoolCount')]: assignment.schoolCount,
            [this.translate.instant('dashboard.Assignments.Subject')]: getLocalizedValue(assignment.subjectName),
            [this.translate.instant('dashboard.Assignments.Exam Date And Time')]: assignment.examShowDate,
            [this.translate.instant('dashboard.surveys.createdDate')]: assignment.createdDate,
            [this.translate.instant('dashboard.surveys.createdBefore')]: assignment.userFullName,
            [this.translate.instant('dashboard.Assignments.Status')]: assignment.examStatus == StatusEnum.Available? this.translate.instant('Available') : this.translate.instant('Unavailable')  ,

          }
        })
      }))
  }


  AddAssignment(data: IuploadAssignment): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}`+'/Exam', data);
  }
  _headers = new HttpHeaders({
    'Accept': 'application/json',
    'zumo-api-version': '2.0.0',

});
  public onFileUpload(_file : any ): Observable<any>{
    return this._http.post<any>(this.baseUrl + '/Upload/Upload-blobstorage?type=exam',_file,{headers:this._headers});
  }
}
