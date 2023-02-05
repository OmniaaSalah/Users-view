import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject, EventEmitter,inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, map, Observable, take,finalize } from 'rxjs';
import { IUser, Token } from 'src/app/core/Models/base.models';
import { Filter } from 'src/app/core/models/filter/filter';
import { IAccount } from 'src/app/core/Models/IAccount';
import { IAccountAddOrEdit } from 'src/app/core/Models/IAccountAddOrEdit';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserInformationService {
  usersStatusList;
  baseUrl = environment.serverUrl;
  private headers = new HttpHeaders();
  lang = inject(TranslationService).lang

  private token: any = new Token();
  protected prefix: string = '$AJ$';
  cities: string[];

  selectedCities: string[];
  usersList: IUser[] = [];
  constructor(private router: Router ,private translate:TranslateService,private http: HttpClient,private http_handler:HttpHandlerService,private tableLoaderService: LoaderService
) {
  this.headers = this.headers.set('content-type', 'application/json');
  this. usersStatusList=[
    {'name':this.translate.instant("Active"),value:true},
    {'name':this.translate.instant("Inactive"),value:false}
  ];
  [
    
  ];
  }
  _headers = new HttpHeaders({
    'Accept': ' */*',
    'content-type': 'application/json-patch+json'

});

getUsersList(filter?:Partial<Filter>){
  this.tableLoaderService.isLoading$.next(true);
  return this.http_handler.get('/Account/Search',filter).pipe(take(1),finalize(()=> {
    this.tableLoaderService.isLoading$.next(false)
  }));

}

usersToExport(filter){
  return this.http_handler.get('/Account/Search',filter)
  .pipe(
    map(res=>{
      return res
      .data.map(user =>{
        return {
          [this.translate.instant('shared.Full Name')]: user?.fullName[this.lang],
          [this.translate.instant('dashboard.UserInformation.Private Role')]: user?.roleName[this.lang],
          [this.translate.instant('shared.email')]: user?.email,
          [this.translate.instant('dashboard.UserInformation.lastLoginDate')]: user?.lastLoginDate ? user?.lastLoginDate : '-',
          [this.translate.instant('shared.Identity Number')]: user?.emiratesIdNumber,
          [this.translate.instant('shared.phoneNumber')]: user?.phoneNumber,
          [this.translate.instant('shared.Created Date')]: user?.createdDate,
          [this.translate.instant('dashboard.UserInformation.User Status')]: user?.isActive? this.translate.instant('Active') : this.translate.instant('Inactive')  ,

        }
      })
    }))
}
  


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
