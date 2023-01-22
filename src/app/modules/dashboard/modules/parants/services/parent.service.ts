import { Injectable } from '@angular/core';
import { finalize, Observable, take } from 'rxjs';
import { Filter } from 'src/app/core/models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  constructor(private http: HttpHandlerService,
    private tableLoaderService: LoaderService) {

   }

  getAllParents(filter?:Partial<Filter>) {
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get('/Guardian',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
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
    return this.http.get(`/Guardian/${id}/Children?yearId=1`).pipe(take(1));
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
}
