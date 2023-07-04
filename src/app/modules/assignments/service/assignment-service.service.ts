import { Injectable,inject } from '@angular/core';
import { map ,finalize, Observable, take, throwError,} from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { TranslateService } from '@ngx-translate/core';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { getLocalizedValue } from 'src/app/core/helpers/helpers';
import { IuploadAssignment } from 'src/app/core/Models/IuploadAssignment';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentServiceService {
  examStatusList;
  lang = inject(TranslationService).lang
  constructor(private http: HttpHandlerService, private tableLoaderService: LoaderService,private translate:TranslateService) {

     this.examStatusList=[{value:StatusEnum.Available,name:this.translate.instant('login.'+StatusEnum.Available)},{value:StatusEnum.Unavailable,name:this.translate.instant('login.'+StatusEnum.Unavailable)}]
  }

  GetGradeList(): Observable<any> {

    return this.http.get(`/Grade`).pipe(take(1));
  }


  getAssignmentList(filter,schoolId?) {
    this.tableLoaderService.isLoading$.next(true);
    return this.http.get(`/Exam?schoolId=${schoolId}`,filter).pipe(take(1),finalize(()=> {
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

    return this.http.post('/Exam',data).pipe(
      map((res)=>{
        if(res.statusCode!='OK')
      {
         throw new Error(res.errorLocalized[this.lang])
      }
      else{
        return res;
      }
      }),
      take(1));
  }

}
