import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, from, map, of, share, shareReplay, take } from 'rxjs';
import { ArrayOperations } from 'src/app/core/classes/array';
import { Curriculum, Division, Grade, Track } from 'src/app/core/models/global/global.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { FileEnum } from '../../enums/file/file.enum';
import { GenderEnum, ReligionEnum } from '../../enums/global/global.enum';
import { PermissionsEnum } from '../../enums/permissions/permissions.enum';

import { StatusEnum } from '../../enums/status/status.enum';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  allDivisions:Division[]
  allCurriculum: Curriculum[]
  allGrades: Grade[]
  allTraks: Track[]
  allOptionalSubjects
  public scope= new BehaviorSubject<string>("");
  
  userClaims:Partial<{[key in PermissionsEnum]: PermissionsEnum}>={}

  booleanOptions= [
    {name: this.translate.instant('shared.yes'), value:true},
    {name: this.translate.instant('shared.no'), value:false}
  ]

  statusOptions =[
    {name: this.translate.instant('shared.allStatus.'+StatusEnum.Active) , value:StatusEnum.Active},
    {name: this.translate.instant('shared.allStatus.'+ StatusEnum.Inactive), value:StatusEnum.Inactive}
  ]

  genderOptions =[
    {name: this.translate.instant('shared.genderType.'+ GenderEnum.Male), value:GenderEnum.Male},
    {name: this.translate.instant('shared.genderType.'+GenderEnum.Female) , value:GenderEnum.Female},
  ]

  religions=[
    {name: this.translate.instant('shared.'+ ReligionEnum.Muslim), value:ReligionEnum.Muslim},
    {name: this.translate.instant('shared.'+ReligionEnum.UnMuslim) , value:ReligionEnum.UnMuslim}, 
  ]

  fileTypesOptions=[
    {name: FileEnum.Xlsx, value:'.xlsx'},
    {name: FileEnum.Csv, value:'.csv'},
    {name: FileEnum.Pdf, value:'application/pdf'},
    {name: FileEnum.Image, value:'image/*'},
    {name: FileEnum.Audio, value:'application/audio'}
  ]

  
  constructor(
    private translate :TranslateService,
    private http: HttpHandlerService
  ) {
    this.scope.next('')
  }

  getUserClaims(){
    if(Object.keys(this.userClaims).length) return of(this.userClaims)

    return this.http.get('/current-user/get-claims')
    .pipe(
      map((res)=> res.result),
      map((res)=> res.map(val => val.code)),
      map((claims:any)=> {
        let claimsMap = ArrayOperations.arrayOfStringsToObject(claims)
        this.userClaims = {...claimsMap}
        return claimsMap
      }),
      take(1)
    )
  }


  getAllCurriculum(){
    if(this.allCurriculum) return of(this.allCurriculum)
    return this.http.get('/Curriculum')
    .pipe(
      take(1),
      map((res)=> {
        this.allCurriculum = res.data
        return res.data
      }))
  }

  getAllDivisions(){
    if(this.allDivisions) return of(this.allDivisions)
    return this.http.get(`/Division`).pipe(take(1),map(val => {
       this.allDivisions = val.data
       return val.data
    }))
  }

  getAllGrades(){
    if(this.allGrades) return of(this.allGrades)
    return this.http.get(`/Grade`).pipe(take(1),map(val => {
      this.allGrades = val.data
      return val.data
    }))
  }

  getAllTraks(){
    if(this.allTraks) return of(this.allTraks)
    return this.http.get(`/Track`).pipe(take(1),map(val => {
      this.allTraks = val.data
      return val.data
    }))
  }

  getAllOptionalSubjects(params){
    return this.http.get('/Subject/elective-subjects',params).pipe(take(1))
  }

}
