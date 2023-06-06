import { Injectable,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, from, map, of, share, shareReplay, take } from 'rxjs';
import { ArrayOperations } from 'src/app/core/classes/array';
import { Curriculum, Division, Grade,  Track } from 'src/app/core/models/global/global.model';
import { shool_DDL } from 'src/app/core/Models/Survey/IAddSurvey';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { FileTypeEnum, FileExtentions } from '../../enums/file/file.enum';
import { GenderEnum, ReligionEnum, SemesterEnum } from '../../enums/global/global.enum';
import { ClaimsEnum } from '../../enums/claims/claims.enum';

import { StatusEnum, TransportaionType } from '../../enums/status/status.enum';
import { IndexesEnum } from '../../enums/indexes/indexes.enum';
import { SettingsService } from 'src/app/modules/system-setting/services/settings/settings.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  filterLoading = new BehaviorSubject(false);
  openSelectSchoolsModel = new BehaviorSubject(false);
  currentSchoolEmployee = new BehaviorSubject(0);
  indexListType=[];
  lang = inject(TranslationService).lang

  currentActiveStep$ = new BehaviorSubject(0)


  private allDivisions:Division[]
  private allCurriculum: Curriculum[]
  private allNationality;
  private allGrades: Grade[]
  private allTraks: Track[]

  private allSchools: shool_DDL[]
  private allOptionalSubjects
  appliedFilterCount$ = new BehaviorSubject<null | number>(0)


  weekDays=[
      {id:0,name:{ar:this.translate.instant('Sunday'),en:'Sunday'}},
      {id:1,name:{ar:this.translate.instant('Monday'),en:'Monday'}},
      {id:2,name:{ar:this.translate.instant('Tuesday'),en:'Tuesday'}},
      {id:3,name:{ar:this.translate.instant('Wednesday'),en:'Wednesday'}},
      {id:4,name:{ar:this.translate.instant('Thursday'),en:'Thursday'}},
      {id:5,name:{ar:this.translate.instant('Friday'),en:'Friday'}},
      {id:6,name:{ar:this.translate.instant('Saturday'),en:'Saturday'}}
  ];

  booleanOptions= [
    {name: this.translate.instant('shared.yes'), value:true},
    {name: this.translate.instant('shared.no'), value:false}
  ];

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
    {name: FileTypeEnum.Xlsx, extention:FileExtentions.Xlsx},
    {name: FileTypeEnum.Csv, extention:FileExtentions.Csv},
    {name: FileTypeEnum.Pdf, extention:FileExtentions.Pdf},
    {name: FileTypeEnum.Image, extention:FileExtentions.Image},
    {name: FileTypeEnum.Audio, extention:FileExtentions.Audio}
  ]

  semesterTypes=[
    {label:this.translate.instant('shared.firstSemester'), active: true, value:SemesterEnum.FirstSemester},
    {label:this.translate.instant('shared.lastSemester'), active: false, value:SemesterEnum.LastSemester},
    {label:this.translate.instant('shared.finalResult'), active: false, value:SemesterEnum.FinalResult}
  ]

 studentCategoryList=[
    {
      value:StatusEnum.Citizens,
      name: this.translate.instant("shared.allStatus."+StatusEnum.Citizens)
    },
    {
      value:StatusEnum.Arabs,
      name: this.translate.instant("shared.allStatus."+StatusEnum.Arabs)
    },
    {
      value:StatusEnum.NonArab,
      name: this.translate.instant("shared.allStatus."+StatusEnum.NonArab)
    },
    {
      value:StatusEnum.IsChildOfAMartyr,
      name: this.translate.instant("shared.allStatus."+StatusEnum.IsChildOfAMartyr)
    },
    {
      value:StatusEnum.ChildOfCitizens,
      name: this.translate.instant("shared.allStatus."+StatusEnum.ChildOfCitizens)
    },
    {
      value:StatusEnum.EmiratesCitizens,
      name: this.translate.instant("shared.allStatus."+StatusEnum.EmiratesCitizens)
    },
    {
      value:StatusEnum.IsSpecialAbilities,
      name: this.translate.instant("shared.allStatus."+StatusEnum.IsSpecialAbilities)
    },
    {
      value:StatusEnum.SonsOfTheFirstLineOfDefens,
      name: this.translate.instant("shared.allStatus."+StatusEnum.SonsOfTheFirstLineOfDefens)
    },
    {
      value:StatusEnum.GCCNational,
      name: this.translate.instant("shared.allStatus."+StatusEnum.GCCNational)
    }
  ]
  transportaionTypes=[
    {
      value:TransportaionType.PrivateCar,
      name: this.translate.instant("shared."+TransportaionType.PrivateCar)
    },
    {
      value:TransportaionType.SchoolBus,
      name: this.translate.instant("shared."+TransportaionType.SchoolBus)
    }
  ];
  usersStatusList=[
    {'name':this.translate.instant("Active"),value:true},
    {'name':this.translate.instant("Inactive"),value:false}
  ];

  constructor(
    private translate :TranslateService,
    private http: HttpHandlerService,
    private SettingsService:SettingsService
  ) {

  }


  getIndexesTypes()
  {
  return  this.indexListType=[
      {indexType:this.translate.instant('TheMainReasonsForRejectionOfTheApplicationForRegistration'),value:IndexesEnum.TheMainReasonsForRejectionOfTheApplicationForRegistration},
      {indexType:this.translate.instant('ReasonsForRefusingToRemoveAStudentFromASchool'),value:IndexesEnum.ReasonsForRefusingToRemoveAStudentFromASchool},
      {indexType:this.translate.instant('TheMainReasonsForStudentDeletion'),value:IndexesEnum.TheMainReasonsForStudentDeletion},
      {indexType:this.translate.instant('ReasonsForWithdrawingTheStudentFromTheCurrentSchool'),value:IndexesEnum.ReasonsForWithdrawingTheStudentFromTheCurrentSchool},
      {indexType:this.translate.instant('TheReasonForRejectingTheWithdrawalRequest'),value:IndexesEnum.TheReasonForRejectingTheWithdrawalRequest},
      {indexType:this.translate.instant('TheTypeOfTalentOfTheStudent'),value:IndexesEnum.TheTypeOfTalentOfTheStudent},
      // {indexType:this.translate.instant('ReasonsForRepeatingASpecificCourseOrSubject'),value:IndexesEnum.ReasonsForRepeatingASpecificCourseOrSubject},
      {indexType:this.translate.instant('TheReasonForRejectRegradingRequest'),value:IndexesEnum.TheReasonForRejectRegradingRequest},
      {indexType:this.translate.instant('DiplomaType'),value:IndexesEnum.DiplomaType},
      {indexType:this.translate.instant('TtypeOfCommunicationMessage'),value:IndexesEnum.TtypeOfCommunicationMessage},
      {indexType:this.translate.instant('TypesOfFileAttachmentsForSchoolStaff'),value:IndexesEnum.TypesOfFileAttachmentsForSchoolStaff},
      {indexType:this.translate.instant('TheTypeOfFileAttachmentForTheParent'),value:IndexesEnum.TheTypeOfFileAttachmentForTheParent},
      {indexType:this.translate.instant('CitiesOfSharjah'),value:IndexesEnum.CitiesOfSharjah},
      {indexType:this.translate.instant('CitiesOfTheCentralRegion'),value:IndexesEnum.CitiesOfTheCentralRegion},
      {indexType:this.translate.instant('EasternProvinceCities'),value:IndexesEnum.EasternProvinceCities},
      {indexType:this.translate.instant('TypesOfGradeImprovement'),value:IndexesEnum.TypesOfGradeImprovement},
      {indexType:this.translate.instant('NationalityCategory'),value:IndexesEnum.NationalityCategory},
      {indexType:this.translate.instant('SpecialEducation'),value:IndexesEnum.SpecialEducation},
      {indexType:this.translate.instant('Language'),value:IndexesEnum.Language},
      {indexType:this.translate.instant('ReasonsForIssuingBoardCertificate'),value:IndexesEnum.ReasonsForIssuingBoardCertificate},
      {indexType:this.translate.instant('TheReasonForLackOfIdentification'),value:IndexesEnum.TheReasonForLackOfIdentification},
      {indexType:this.translate.instant('TheReasonForAbsent'),value:IndexesEnum.TheReasonForAbsent},
      {indexType:this.translate.instant('TheReasonForRegradingRequest'),value:IndexesEnum.TheReasonForRegradingRequest},
      {indexType:this.translate.instant('TheReasonForWithdrawalRequest'),value:IndexesEnum.TheReasonForWithdrawalRequest},
      {indexType:this.translate.instant('ModifyStudentResult'),value:IndexesEnum.ModifyStudentResult}
    ]
  }

  getReligion(){
    return this.http.get('/Religion')
  }


  getAllCurriculum(){
    if(this.allCurriculum) return of(this.allCurriculum)
    return this.http.get(`/Curriculum?SortColumnName=${this.lang=='ar'?'ArabicName':'EnglishName'}`)
    .pipe(
      take(1),
      map((res)=> {
        this.allCurriculum = res.data
        return res.data
      }))
  }

  getAllDivisions(schoolid?){
    if(this.allDivisions) return of(this.allDivisions)
    return this.http.get(`/Division?schoolid=${schoolid}`).pipe(take(1),map(val => {
       this.allDivisions = val.data
       return val.data
    }))
  }

  getAllGrades(schoolid=''){
    if(this.allGrades) return of(this.allGrades)
    return this.http.get(`/Grade?schoolid=${schoolid}`).pipe(take(1),map(val => {
      this.allGrades = val.data
      return val.data
    }))
  }

  getAllNationalities(){
    if(this.allNationality) return of(this.allNationality)
    return this.http.get(`/Nationality?SortColumnName=${this.lang=='ar'?'ArName':'EnName'}`).pipe(take(1),map(val => {
      this.allNationality = val.data
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

  getSchoolsByCurriculumId(curriculumId){
    return this.http.get('/School/dropdowen?curriculumId='+curriculumId)
    .pipe(
      take(1),
      map((res)=> {
        this.allSchools = res
        return res
      }))
  }

  getSchoolYearsList()
  {
    return this.http.get('/SchoolYear/dropdown').pipe(take(1))
  }

  getOldSchoolYearsList(){
    return this.http.get('/certificate/academic/schoolyear/dropdown').pipe(take(1))
  }


  getParentRelative(){
    return this.http.get('/Child/relative-relation').pipe(map(res => res.data))
   }

   getCurrentYear()
   {
    return this.http.get('/SchoolYear/current')
   }
}
