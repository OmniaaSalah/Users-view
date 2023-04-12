import {HttpHeaders } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {  map, Observable, take,finalize } from 'rxjs';
import { IUser} from 'src/app/core/Models/base.models';
import { IAccountAddOrEdit } from 'src/app/core/Models/IAccountAddOrEdit';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';



@Injectable({
  providedIn: 'root'
})
export class UserInformationService {
  usersStatusList;
  lang = inject(TranslationService).lang

  usersList: IUser[] = [];
  constructor(private router: Router ,private translate:TranslateService,private http:HttpHandlerService,private tableLoaderService: LoaderService
) {

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

getUsersList(filter?){
  this.tableLoaderService.isLoading$.next(true);
  return this.http.post('/Account/Search',filter).pipe(take(1),finalize(()=> {
    this.tableLoaderService.isLoading$.next(false)
  }));

}

usersToExport(filter){
  return this.http.post('/Account/Search',filter)
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


  getUsersById(id:number){

    return this.http.get('/Account/Get/'+id).pipe(take(1));
  }



  AddAccount(data: IAccountAddOrEdit): Observable<any> {
    return this.http.post(`/Account/Add`,data).pipe(take(1));
  }
  EditAccount(data: IAccountAddOrEdit): Observable<any> {
    return this.http.put(`/Account/Update`,data).pipe(take(1));
  }
  GetRoleList(): Observable<any> {
    return this.http.get(`/role-details/dropdown`).pipe(take(1));
  }
  GetRoleById(id:number){
    return this.http.get('/role-details/'+id).pipe(take(1));
  }


  deleteUser(userId){
    return this.http.delete(`/Guardian/delete-guardian/${userId}`).pipe(take(1))
  }
}
