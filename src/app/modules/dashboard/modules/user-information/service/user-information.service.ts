import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUser, Token } from 'src/app/core/Models/base.models';
import { Filter } from 'src/app/core/models/filter/filter';
import { IAccount } from 'src/app/core/Models/IAccount';
import { IAccountAddOrEdit } from 'src/app/core/Models/IAccountAddOrEdit';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserInformationService {

  baseUrl = environment.serverUrl;
  private headers = new HttpHeaders();


  private token: any = new Token();
  protected prefix: string = '$AJ$';
  cities: string[];

  selectedCities: string[];
  usersList: IUser[] = [];
  constructor(private router: Router ,private http: HttpClient,private tableLoaderService: LoaderService
) {
  this.headers = this.headers.set('content-type', 'application/json');

  }
  _headers = new HttpHeaders({
    'Accept': ' */*',
    'content-type': 'application/json-patch+json'

});

getUsersList(filter?:Partial<Filter>){

  this.tableLoaderService.isLoading$.next(true)
  let params = new HttpParams();
  if (filter?.SortColumn)
    params = params.append('SortColumn', filter?.SortColumn);
  if (filter?.SortDirection)
    params = params.append('SortDirection', filter.SortDirection);
  if (filter?.KeyWord)
    params = params.append('KeyWord', filter.KeyWord);
  if (filter?.SortBy)
    params = params.append('SortBy', filter.SortBy);
  if (filter?.isActive != null)
    params = params.append('isactive', filter.isActive);
  if (filter?.roleId != null)
    params = params.append('roleId', filter.roleId);
  return this.http.get<any>(this.baseUrl+'/Account/Search' , {observe:'response', params}).pipe(
    map(response => {
       return response.body ;
    })
  )

  // return this.http.get('/Account/Search',filter)
  // .pipe(
  //   take(1),
  //   finalize(()=> {
  //     this.tableLoaderService.isLoading$.next(false)
  //   }))
}
//   getUsersList(keyword:string ,sortby:string ,page :number , pagesize :number): Observable<any>{

//     let body= {keyword:keyword.toString() ,sortBy: sortby.toString() ,page:Number(page) , pageSize:Number(pagesize)}
// console.log(body)
//     return this.http.post<any>(`${this.baseUrl+'/Account/Search'}`,body ,{observe:'body',headers:this._headers }).pipe(
//       map(response => {
//          return response ;
//       })
//     )
//   }
  getUsersListByRoled(roleId?:number , isactive? : boolean  , keyword?:string ,sortby?:string ,page? :number , pagesize? :number): Observable<any>{

    let body= {keyword:keyword.toString() ,sortBy: sortby.toString() ,page:Number(page) , pageSize:Number(pagesize)}

if(roleId == null && isactive != null){
  return this.http.post(`${this.baseUrl+'/Account/Search?isactive='+isactive}`,body ,{observe:'body',headers:this._headers }).pipe(
    map(response => {
       return response ;
    })
  )
}
if(roleId != null && isactive == null){
  return this.http.post(`${this.baseUrl+'/Account/Search?roleId='+roleId}`,body ,{observe:'body',headers:this._headers }).pipe(
    map(response => {
       return response ;
    })
  )
}
else{
  return this.http.post(`${this.baseUrl+'/Account/Search?roleId='+roleId+'&isactive='+isactive}`,body ,{observe:'body',headers:this._headers }).pipe(
    map(response => {
       return response ;
    })
  )
}
}

  getUsersById(id:number): Observable<IAccount>{
    return this.http.get<IAccount>(`${this.baseUrl+'/Account/Get/'+id}`);
  }



  AddAccount(data: IAccountAddOrEdit): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Account/Add`, data);
  }
  EditAccount(data: IAccountAddOrEdit): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Account/Update`, data);
  }
  GetRoleList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}` + `/role-details/dropdown`);
  }
  GetRoleById(id:number): Observable<IAccount>{
    return this.http.get<IAccount>(`${this.baseUrl+'/role-details/'+id}`);
  }


}
