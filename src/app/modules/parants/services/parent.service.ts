import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, finalize, map, Observable, take } from 'rxjs';
import { getLocalizedValue } from 'src/app/core/helpers/helpers';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { GenericResponse } from 'src/app/core/models/global/global.model';
import { Guardian } from 'src/app/core/models/guardian/guardian.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { HttpStatusCodeEnum } from 'src/app/shared/enums/http-status-code/http-status-code.enum';
import { StudentStatus } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ParentService {


  constructor(private http: HttpHandlerService,
    private translate:TranslateService,
    private userService:UserService,
    private router: Router,
    private sharedService:SharedService,
    private tableLoaderService: LoaderService) {

   }

  getAllParents(filter?:Partial<SearchModel>):Observable<GenericResponse<Guardian[]>> {
    this.tableLoaderService.isLoading$.next(true)
    return this.http.post('/Guardian/Search',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  parentsToExport(filter?): Observable<Guardian[]>{
    let currentUserScope = this.userService.getScope();
    let schoolId = this.userService.getSchoolId()
    // let url = currentUserScope == UserScope.Employee ? `/Guardian/gurdians/${schoolId}` : '/Guardian/Search'
    let httpReq =  currentUserScope == UserScope.Employee ? this.http.get(`/Guardian/gurdians/${schoolId}`,filter) : this.http.post('/Guardian/Search',filter)
    return httpReq
    .pipe(
      take(1),
      map(res =>res.data),
      map(res=>{
        return res.map(el=>{
          return {
            [this.translate.instant('parents.parentName')]: getLocalizedValue(el.name),
            [this.translate.instant('parents.parentNickname')]: getLocalizedValue(el.surname),
            [this.translate.instant('shared.Identity Number')]: el.emiratesIdNumber,
            [this.translate.instant('shared.gender')]: this.translate.instant('shared.genderType.'+el.gender),
            [this.translate.instant('shared.birthDay')]: el.birthDate,
            [this.translate.instant('shared.nationality')]: getLocalizedValue(el.nationalityName),
            [this.translate.instant('shared.phoneNumber')]: el.mobile || "لايوجد",
            [this.translate.instant('shared.email')]: el.email,
            [this.translate.instant('parents.pendingRequests')]: el.requestCount,
            [this.translate.instant('parents.childrenNumber')]: el.childrenCount || 'لايوجد',
          }
        })
      })
      )
  }

  getAllParentsInSpecificSchool(schoolId,filter?:Partial<SearchModel>) {
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/Guardian/gurdians/${schoolId}`,filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  getGuardianDropdown(searchModel){
    return this.http.get('/Guardian/filter-gurdians',searchModel).pipe(take(1))
   }

  getChildernByParentId(id:number): Observable<any>{
    return this.http.get(`/Guardian/${id}/Children`)
    .pipe(take(1));
  }
  getChildernByParentIdAndSchoolId(parentId:number,schoolId:number): Observable<any>{
    return this.http.get(`/Student/students/${parentId}/${schoolId}`).pipe(take(1));
  }
  getChild(id:number): Observable<any>{
    return this.http.get(`/Child/${id}`)
    .pipe(
      map(res=>{
        if(res.statusCode==HttpStatusCodeEnum.NotFound) {
          localStorage.setItem('notFoundMessage', getLocalizedValue(res?.errorLocalized))
          this.sharedService.notFoundMessage = getLocalizedValue(res?.errorLocalized)

          this.router.navigate(['/oops/page-not-allowed'])
          return EMPTY
        }
        else return res
      }),
      take(1));
  }

  updateChild(id, childData): Observable<any>{
    return this.http.put(`/Child`,childData).pipe(take(1));
  }

  deleteChild(id){
    return this.http.delete(`/Child`,{},{id})
    .pipe(
      map(res=>{
        if(res.statusCode==HttpStatusCodeEnum.BadRequest) throw new Error(getLocalizedValue(res.errorLocalized))
        else return res
      }),
      take(1))
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


  registerChildBySpea(studentRegistrationStatus,childId, childData){
    if(studentRegistrationStatus===StudentStatus.Withdrawal){
      return this.http.post(`/Student/enroll-withdrawal-student/${childId}`,childData).pipe(take(1));
    }else{

      return this.http.post(`/Student/enroll/${childId}`,childData).pipe(take(1));
    }

  }
  getGuardianById(guardianId)
  {
    return this.http.get(`/Guardian/profile/${guardianId}`).pipe(take(1));
  }
  updateGuardian(guardianId,guardian)
  {
    return this.http.put(`/Guardian/profile/${guardianId}`,guardian).pipe(take(1));
  }

}
