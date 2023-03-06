import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, finalize, map, Observable, take } from 'rxjs';
import { getLocalizedValue } from 'src/app/core/classes/helpers';
import { Filter } from 'src/app/core/models/filter/filter';
import { GenericResponse } from 'src/app/core/models/global/global.model';
import { Guardian } from 'src/app/core/models/guardian/guardian.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  
  constructor(private http: HttpHandlerService,
    private translate:TranslateService,
    private tableLoaderService: LoaderService) {

   }

  getAllParents(filter?:Partial<Filter>):Observable<GenericResponse<Guardian[]>> {
    this.tableLoaderService.isLoading$.next(true)
    return this.http.post('/Guardian/Search',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  parentsToExport(filter?): Observable<Guardian[]>{
    return this.http.post('/Guardian/Search',filter)
    .pipe(
      take(1),
      map(res =>res.data),
      map(res=>{
        return res.map(el=>{
          return {
            [this.translate.instant('dashboard.parents.parentName')]: getLocalizedValue(el.name),
            [this.translate.instant('dashboard.parents.parentNickname')]: getLocalizedValue(el.surname),
            [this.translate.instant('shared.Identity Number')]: el.emiratesIdNumber,
            [this.translate.instant('shared.gender')]: this.translate.instant('shared.genderType.'+el.gender),
            [this.translate.instant('shared.birthdate')]: el.birthDate,
            [this.translate.instant('shared.nationality')]: getLocalizedValue(el.nationalityName),
            [this.translate.instant('shared.phoneNumber')]: el.mobile || "لايوجد",
            [this.translate.instant('shared.email')]: el.email,
            [this.translate.instant('dashboard.parents.pendingRequests')]: el.requestCount,
            [this.translate.instant('dashboard.parents.childrenNumber')]: el.childrenCount || 'لايوجد',
          }
        })
      })
      )
  }

  getAllParentsInSpecificSchool(schoolId,filter?:Partial<Filter>) {
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/Guardian/gurdians/${schoolId}`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  getParentBySchoolId(id:number): Observable<any>{
    return this.http.get(`/Guardian/filter-gurdians?SchoolId=${id}`).pipe(take(1));
  }

  getChildernByParentId(id:number): Observable<any>{
    return this.http.get(`/Guardian/${id}/Children`).pipe(take(1));
  }
  getChildernByParentIdAndSchoolId(parentId:number,schoolId:number): Observable<any>{
    return this.http.get(`/Student/students/${parentId}/${schoolId}`).pipe(take(1));
  }
  getChild(id:number): Observable<any>{
    return this.http.get(`/Child/${id}`).pipe(take(1));
  }

  updateChild(id, childData): Observable<any>{
    return this.http.put(`/Child`,childData).pipe(take(1));
  }

  deleteChild(id){
    return this.http.delete(`/Child`,{},{id}).pipe(take(1))
  }

  sendRegisterRequest(childData){
    return this.http.post(`/Student/registration-request`,childData).pipe(take(1));
  }

  getSelectedGradeForWithdrawalStudent(studentId){
    return this.http.get(`/Student/current-grade/${studentId}`).pipe(take(1));

  }

  updateRegisterRequest(childData){
    return this.http.put(`/Student/registration-request`,childData).pipe(take(1));
  }


  registerChildBySpea(childId, childData){
    return this.http.post(`/Student/enroll/${childId}`,childData).pipe(take(1));
  }

}
