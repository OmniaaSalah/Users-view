import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, finalize, map, Observable, of, take } from 'rxjs';
import { getLocalizedValue } from 'src/app/core/helpers/helpers';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { GenericResponse } from 'src/app/core/models/global/global.model';
import { MapedFileRule, RequestRule } from 'src/app/core/models/settings/settings.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { FileExtentions } from 'src/app/shared/enums/file/file.enum';
import { GracePeriodEnum } from 'src/app/shared/enums/settings/settings.enum';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { requestTypeEnum } from 'src/app/shared/enums/system-requests/requests.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  get userScope() { return UserScope }
	currentUserScope = inject(UserService).getScope()

  fileRules$ = new BehaviorSubject<Partial<MapedFileRule> |null>(null)

  filesSettings :RequestRule[]=[
    {
      ruleId:0,
      requestType:requestTypeEnum.DeleteStudentRequest ,
      filesCount: 1,
      isRequired: true,
      files:[
        // {
        //   ruleFileId:0,
        //   name:{ar:'', en:''},
        //   type:'',
        //   size: 2
        // }
      ]
    },
    {
      ruleId:0,
      requestType:requestTypeEnum.RegestrationApplicationRequest ,
      filesCount: 2,
      isRequired: true,
      files:[
        // {
        //   ruleFileId:0,
        //   name:{ar:'', en:''},
        //   type:'',
        //   size: 2
        // },

      ]
    },
    {
      ruleId:0,
      requestType:requestTypeEnum.RegestrationRequestForWithrawan ,
      filesCount: 1,
      isRequired: true,
      files:[
        // {
        //   ruleFileId:0,
        //   name:{ar:'', en:''},
        //   type:'',
        //   size: 2
        // }
      ]
    },
    {
      ruleId:0,
      requestType:requestTypeEnum.WithdrawalRequest  ,
      filesCount: 1,
      isRequired: true,
      files:[
        // {
        //   ruleFileId:0,
        //   name:{ar:'', en:''},
        //   type:'',
        //   size: 2
        // }
      ]
    },
    {
      ruleId:0,
      requestType:requestTypeEnum.ModifyIdentityRequest   ,
      filesCount: 1,
      isRequired: true,
      files:[
        // {
        //   ruleFileId:0,
        //   name:{ar:'', en:''},
        //   type:'',
        //   size: 2
        // }
      ]
    },
    {
      ruleId:0,
      requestType:requestTypeEnum.BoardCertificateRequest   ,
      filesCount: 1,
      isRequired: true,
      files:[
        // {
        //   ruleFileId:0,
        //   name:{ar:'', en:''},
        //   type:'',
        //   size: 2
        // }
      ]
    },
  ]

  constructor(private http:HttpHandlerService,
    private translate:TranslateService,
    private tableLoaderService: LoaderService) { }


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
    {id:2, name:'رفع الدرجات', value: GracePeriodEnum.raisDegreesFirstClass},
    {id:3, name:'حذف الطلاب', value: GracePeriodEnum.deleteStudents}
  ]

  getGracePeriodTypes(){
    // return of(this.gracePeriodList)
    return this.http.get('/system-settings/grace-period/types').pipe(map(res => res.result),take(1))
  }

  getGracePeriodList(filter?:SearchModel): Observable<GenericResponse<any>>{
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get('/system-settings/grace-period/search', filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }


  getGracePeriodListToExport(filter:SearchModel): Observable<GenericResponse<any>>{

    return this.http.get('/system-settings/grace-period/search', filter)
    .pipe(
      map(res=>{
        return res.data.map(gracePeriod =>{
          return {
            [this.translate.instant('SystemSetting.Type')]: getLocalizedValue(gracePeriod.gracePeriodType.name),
            [this.translate.instant('SystemSetting.SchoolNumber')]: gracePeriod.allowedSchools.length,
            [this.translate.instant('SystemSetting.ClassNumber')]: gracePeriod.allowedGradesCount,
            [this.translate.instant('SystemSetting.TimeFrom')]: gracePeriod.dateFrom,
            [this.translate.instant('SystemSetting.TimeTo')]: gracePeriod.dateTo,
            [this.translate.instant('SystemSetting.CreatedBy')]: getLocalizedValue(gracePeriod.createdBy),
            [this.translate.instant('SystemSetting.CreatedDate')]: gracePeriod.createdDate  ,

          }
        })
      })
      )
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

    isSchoolExistInGracePeriod(query : {schoolId:number , code:GracePeriodEnum}){
    return this.http.get(`/system-settings/grace-period/check-from-school`, query)
    .pipe(
      map(res=> res.result.valid ? true : false),
      take(1))
  }


  schoolsAllowedToAcceptStudentsGroup(filter:SearchModel): Observable<GenericResponse<any>>{
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/system-settings/grace-period/search-to-schools`, filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  schoolsAllowedForRegistration(filter:SearchModel): Observable<GenericResponse<any>>{
    this.tableLoaderService.isLoading$.next(true)
    return this.http.get(`/system-settings/grace-period/search-allowed-schools`, filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  getSchools(filter:Partial<SearchModel>): Observable<GenericResponse<any>>{
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
    return this.http.post(`/system-settings/notification-cases`, filter)
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
    return this.http.put('/system-settings/registeration-rule/manage',body).pipe(take(1))
  }


  // NOTE:- (الطلبات)شروط الملفات المطلوبه -----------------------
  getRequiredFiles(filter?){
    return this.http.get('/system-settings/request-attached-file-rules',filter).pipe(take(1))
  }

  getRequestRquiredFiles(requestType:requestTypeEnum){
    return this.http.get('/system-settings/request-attached-file-rules/'+ requestType).pipe(take(1))
  }

  getRegisterRequestRequiredAttach(gradeId){
    return this.http.get(`/system-settings/request-attached-file-rules-by-grade/${gradeId}`)
  }

  updateRequiredFiles(body){
    return this.http.put('/system-settings/request-attached-file-rule/manage',body).pipe(take(1))

  }


   // NOTE:- شروط الملفات المرفقه -----------------------
  getAttachedFileRules(){
    return this.http.get('/system-settings/attached-file-rules').pipe(take(1))
  }

  initializeFileRules(){
    if(this.fileRules$.getValue()) return this.fileRules$
    this.getAttachedFileRules()
    .pipe(
      map(res=>{

          switch (this.currentUserScope) {
            case this.userScope.Guardian:
              res =res.guardians
            break;
            case this.userScope.Employee:
              res =res.employees
            break;
            case this.userScope.SPEA:
              res =res.speaEmployees
            break;
            default:
              res =res.speaEmployees
            break;
          }


          return res.map(rule=> {
            return {
              [rule.fileType]:{
                type:rule.fileType,
                extention: FileExtentions[rule.fileType],
                size: rule.fileSize
              }
            }
          })
      }),
      map(rulesArr=>{
         return Object.assign({}, ...rulesArr)
      })
    ).subscribe((res: MapedFileRule)=>{
      this.fileRules$.next(res)

    })
  }

  updateAttachedFileRules(body){
    return this.http.put('/system-settings/attached-file-rule/manage',body).pipe(take(1))
  }


}
