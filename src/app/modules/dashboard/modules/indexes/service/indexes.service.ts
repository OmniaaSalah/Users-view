import { Injectable ,inject} from '@angular/core';
import { take,finalize,map } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { IndexesEnum } from 'src/app/shared/enums/indexes/indexes.enum';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
@Injectable({
  providedIn: 'root'
})
export class IndexesService {
  lang = inject(TranslationService).lang
  indexStatusList;
  indexListType;
  constructor(private http:HttpHandlerService,private translate:TranslateService, private loaderService: LoaderService) {
    this.indexListType=[
      {indexType:this.translate.instant('TheMainReasonsForRejectionOfTheApplicationForRegistration'),value:IndexesEnum.TheMainReasonsForRejectionOfTheApplicationForRegistration},
      {indexType:this.translate.instant('ReasonsForRefusingToRemoveAStudentFromASchool'),value:IndexesEnum.ReasonsForRefusingToRemoveAStudentFromASchool},
      {indexType:this.translate.instant('TheMainReasonsForStudentDeletion'),value:IndexesEnum.TheMainReasonsForStudentDeletion},
      {indexType:this.translate.instant('ReasonsForWithdrawingTheStudentFromTheCurrentSchool'),value:IndexesEnum.ReasonsForWithdrawingTheStudentFromTheCurrentSchool},
      {indexType:this.translate.instant('TheReasonForRejectingTheWithdrawalRequest'),value:IndexesEnum.TheReasonForRejectingTheWithdrawalRequest},
      {indexType:this.translate.instant('TheTypeOfTalentOfTheStudent'),value:IndexesEnum.TheTypeOfTalentOfTheStudent},
      {indexType:this.translate.instant('ReasonsForRepeatingASpecificCourseOrSubject'),value:IndexesEnum.ReasonsForRepeatingASpecificCourseOrSubject},
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
      {indexType:this.translate.instant('TheReasonForAbsent'),value:IndexesEnum.TheReasonForAbsent}
    ]
    this.indexStatusList=[
      {'id':1,'arabicName':this.translate.instant("Active")},
      {'id':2,'arabicName':this.translate.instant("Inactive")}
    ];
  }


  getAllIndexes(filter?:Partial<Filter>)
  { 
    this.loaderService.isLoading$.next(true);
    return this.http.get('/IndexList',filter).pipe(take(1),finalize(()=> {
      this.loaderService.isLoading$.next(false)
    }));
    
  }

  addIndex(index)
  {
 
    return this.http.post('/IndexList',index);
    
      
  }
 
  getIndexByID(indexId:number)
  {
    return this.http.get(`/IndexList/${indexId}`).pipe(take(1))
  }

  updateIndex(indexId:number,index)
  {
 
    return this.http.put(`/IndexList/${indexId}`,index).pipe(take(1))
  }
    
    
  getIndext(type: IndexesEnum)
  { 
   
    return this.http.get(`/IndexList/indexList/${type}`).pipe(take(1));

  }

  indexesToExport(filter){
    return this.http.get('/IndexList',filter)
    .pipe(
      map(res=>{
        return res.data.map(index =>{
          return {
            [this.translate.instant('dashboard.Indexes.List Type')]: this.translate.instant(index?.indexType),
            [this.translate.instant('dashboard.Indexes.Index Name')]: index?.indexName[this.lang],
            [this.translate.instant('dashboard.Indexes.Index Status')]: this.translate.instant(index?.indexStatus),

          }
        })
      }))
  }
  
}
