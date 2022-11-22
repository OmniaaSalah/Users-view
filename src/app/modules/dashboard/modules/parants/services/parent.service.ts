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

  getParentBySchoolId(id:number): Observable<any>{
    return this.http.get(`${this.baseUrl+'/Guardian/filter-gurdians?SchoolId='+id}`);
  }

  getChildernByParentId(id:number): Observable<any>{
    return this.http.get(`/Guardian/${id}/Children?yearId=1`);
  }

  getChild(id:number): Observable<any>{
    return this.http.get(`/Child/${id}`);
  }

  updateChild(id, childData): Observable<any>{
    return this.http.post(`/Child`,childData);
  }
}
