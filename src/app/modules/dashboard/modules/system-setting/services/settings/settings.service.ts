import { Injectable } from '@angular/core';
import { finalize, map, Observable, of, take } from 'rxjs';
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
      requestType:'طلب تعديل اجازه مرنه',
      filesCount: 1,
      isRequired: StatusEnum.Active,
      files:[
        {
          name:{ar:'', en:''},
          type:'',
          size: 2
        }
      ]
    },
    {
      requestType:'طلب تسجيل ابن',
      filesCount: 2,
      isRequired: StatusEnum.Active,
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
      requestType:'طلب رفع الدرجات',
      filesCount: 1,
      isRequired: StatusEnum.Active,
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
    return this.http.get('/system-settings/grace-period/types').pipe(map(res => res.result),take(1))
  }

  getGracePeriodList(filter:Filter): Observable<GenericResponse<any>>{
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get('/system-settings/grace-period/search', filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  getGracePeriodMainData(id){
    return this.http.get('/system-settings/grace-period/' + id).pipe(take(1))
  }

  addGarcePeriod(bodyData){
    return this.http.post('/system-settings/grace-period', bodyData).pipe(take(1))
  }

  
  updateGarcePeriod(bodyData){
    return this.http.put('/system-settings/grace-period', bodyData).pipe(take(1))
  }

  deleteSchoolFromGracePeriod(gracePeriodId ,schoolId ,schoolType ){
    return this.http.delete(`/system-settings/grace-period/delete-school/${gracePeriodId}/${schoolId}/${schoolType}`).pipe(take(1))
  }


  getGracePeriodSchools( filter){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/system-settings/schools/search`, filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  getGracePeriodSchoolDetails(gracePeriodId, schoolId){
    return this.http.get(`/system-settings/grace-period/school-details/${gracePeriodId}/${schoolId}`).pipe(take(1))
  }

  updateGracePeriodSchoolDetails(reqBody){
    return this.http.put(`/system-settings/grace-period/school-details`,reqBody).pipe(take(1))
  }

  isSchoolAllowToTransferGroup(schoolId){
    return this.http.get(`/system-settings/grace-period/check-from-school/${schoolId}`)
    .pipe(
      map(res=> res.result.valid ? true : false),
      take(1))
  }


  schoolsAllowedToAcceptGroup(currculaumId,filter:Filter): Observable<GenericResponse<any>>{
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/system-settings/grace-period/search-to-schools/${currculaumId}`, filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  getSchools(filter:Partial<Filter>): Observable<GenericResponse<any>>{
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/system-settings/schools/search/not-selected/`, filter)
    .pipe(
      take(1),
      map(res=>res.result),
      map(res=> {
        res.data = res.data.map(el => ({id:el.id, name:el.name}) )
        return res
      }),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  getGradeDivision(schoolId, gradeId){
    return this.http.get(`/Division/school/${schoolId}/grade/${gradeId}`).pipe(take(1))
  }



  getNotificationsList(filter){
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/system-settings/notification-cases`, filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }


  updateNotification(data){
    return this.http.put('/system-settings/notification-case/update',data).pipe(take(1))
  }

  getRegistrationRoles(){
    return this.http.get('/system-settings/registeration-rule').pipe(take(1))
  }

  updateRegistrationRoles(body){
    return this.http.put('/system-settings/registeration-rule',body).pipe(take(1))
  }
}
