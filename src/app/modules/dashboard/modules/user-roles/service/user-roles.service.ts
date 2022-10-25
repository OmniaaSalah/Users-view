import { Injectable } from '@angular/core';
import { IUserRoles } from 'src/app/core/Models/iuser-role';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { take,BehaviorSubject,finalize } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {

  roleStatusList;
  public userTittle= new BehaviorSubject<string>("");


  constructor(private http:HttpHandlerService,private translate:TranslateService, private loaderService: LoaderService) {
    this. roleStatusList=[
      {'id':1,'name':{'ar':this.translate.instant("Active"),'en':true}},
      {'id':2,'name':{'ar':this.translate.instant("Inactive"),'en':false}}
    ];

  }
   
  getAllRoles(filter?:Partial<Filter>)
  { 
    this.loaderService.isLoading$.next(true);
    return this.http.post('/role-details',{},filter).pipe(take(1),finalize(()=> {
      this.loaderService.isLoading$.next(false)
    }));
    
  }



  addRole(role)
  {
    console.log(role);
    return this.http.post('/role-details/add',role);
    
      
  }
 
  getRoleByID(roleId:number)
  {
    return this.http.get(`/role-details/${roleId}`).pipe(take(1))
  }

  updateRole(role,roleId)
  {
 
    return this.http.put(`/role-details/update/${roleId}`,role).pipe(take(1))
  }

  deleteRole(roleId:number)
  {
    console.log(roleId);
    return this.http.delete(`/role-details/${roleId}`).pipe(take(1));
   
  }
    
   getAllClaims()
   {
    return this.http.get(`/clams/dropdown`).pipe(take(1))
   }  

   getAllDataRestrictionLevel()
   {
    return this.http.get(``).pipe(take(1))
   } 

}
