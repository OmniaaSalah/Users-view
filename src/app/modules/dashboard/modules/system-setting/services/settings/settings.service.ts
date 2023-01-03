import { Injectable } from '@angular/core';
import { finalize, Observable, of, take } from 'rxjs';
import { Filter } from 'src/app/core/models/filter/filter';
import { GenericResponse } from 'src/app/core/models/global/global.model';
import { RequestCondition } from 'src/app/core/models/settings/settings.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { GracePeriodEnum } from 'src/app/shared/enums/settings/settings.enum';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  filesSettings :RequestCondition[]=[
    {
      requestName:'طلب تعديل اجازه مرنه',
      maxCount: 1,
      status: StatusEnum.Active,
      files:[
        {
          name:{ar:'', en:''},
          type:'',
          size: 2
        }
      ]
    },
    {
      requestName:'طلب تسجيل ابن',
      maxCount: 2,
      status: StatusEnum.Active,
      files:[
        {
          name:{ar:'', en:''},
          type:'',
          size: 2
        },
        {
          name:{ar:'', en:''},
          type:'',
          size: 2
        }
      ]
    },
    {
      requestName:'طلب رفع الدرجات',
      maxCount: 1,
      status: StatusEnum.Active,
      files:[
        {
          name:{ar:'', en:''},
          type:'',
          size: 2
        }
      ]
    },
  ]

  constructor(private http:HttpHandlerService, private tableLoaderService: LoaderService) { }
  

  getSchoolInGracePeriod(){
    let arr={
      name:{ar:'', en:''},
      grades:[
        {
          id:1,
          name:{ar:'الصف الرابع', en:''},
          isActive:false,
          divisions:[],
        },
        {
          id:1,
          name:{ar:'الصف الرابع', en:''},
          isActive:false,
          divisions:[],
        },
        {
          id:1,
          name:{ar:'الصف الرابع', en:''},
          isActive:false,
          divisions:[],
        },
      ],
    }
  return arr

  }

  gracePeriodList=[
    {id:1, name:'نقل الطلاب بشكل جماعى' , value:GracePeriodEnum.transferStudents},
    {id:2, name:'رفع الدرجات', value: GracePeriodEnum.raisDegrees},
    {id:3, name:'حذف الطلاب', value: GracePeriodEnum.deleteStudents}
  ]

  getGracePeriodTypes(){
    // return of(this.gracePeriodList)
    return this.http.get('/system-settings/grace-period-get-system-settings-grace-period-list').pipe(take(1))
  }

  getGracePeriodList(filter:Filter): Observable<GenericResponse<any>>{
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get('/system-settings/grace-period-search', filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  getSchools(filter:Filter): Observable<GenericResponse<any>>{
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get('/system-settings/get-schools-by-curriculums', filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }


  addGarcePeriod(bodyData){
    return this.http.post('/system-settings/create-grace-period-get-system-settings-grace-period', bodyData).pipe(take(1))
  }
}
