import { Injectable ,inject} from '@angular/core';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { take,BehaviorSubject,finalize,map } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { IRestrictionSchool } from 'src/app/core/Models/user-roles/restriction-school';
import { TranslationService } from 'src/app/core/services/translation/translation.service';


@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
  roleStatusList;
  lang = inject(TranslationService).lang;
  dataRestrictionLevelList;
  public userTittle= new BehaviorSubject<string>("");
  public schoolSelectedList= new BehaviorSubject<IRestrictionSchool[]>([]);
  public MarkedListLength= new BehaviorSubject<number>(0);
  constructor(private http:HttpHandlerService,private translate:TranslateService, private loaderService: LoaderService) {
    this.roleStatusList=[
      {'name':this.translate.instant("shared.allStatus.active"),'value':true},
      {'name':this.translate.instant("shared.allStatus.inActive"),'value':false}
    ];
    this.dataRestrictionLevelList=[
      {
        "id": 1,
        "name": {
            "en": "AccessToAllSchoolInformation",
            "ar": this.translate.instant('dashboard.UserRole.AccessToAllSchoolInformation')
        }
      },
      {
        "id": 2,
        "name": {
            "en": "AccessToInformationRelatedToCurriculums",
            "ar": this.translate.instant('dashboard.UserRole.AccessToInformationRelatedToCurriculums')
        }
      },
      {
        "id": 3,
        "name": {
            "en": "AccessToInformationRelatedToSchool",
            "ar": this.translate.instant('dashboard.UserRole.AccessToInformationRelatedToSchool')
        }
      }
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


   getAllcurriculumName()
   {
     return this.http.get('/curriculum').pipe(take(1));

   }

   rolesToExport(filter){
    return this.http.post('/role-details',{},filter)
    .pipe(
      map(res=>{
  
        return res.data.map(role=>{
          return {

            [this.translate.instant('dashboard.UserRole.JobRole Name')]: role?.jobRoleName[this.lang],
            [this.translate.instant('shared.User Name')]: role?.creatorName,
            [this.translate.instant('dashboard.UserRole.Role Users')]: role?.roleUsers,
            [this.translate.instant('shared.Created Date')]: role?.createdDate,
            [this.translate.instant('dashboard.UserRole.Status')]: role?.status ? this.translate.instant('shared.allStatus.active'): this.translate.instant('shared.allStatus.inActive'),
    
   

          }
        })
      }))
  }


}
