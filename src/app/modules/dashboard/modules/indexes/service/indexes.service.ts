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
      {id:0,indexType:{ar:this.translate.instant('TheMainReasonsForRejectionOfTheApplicationForRegistration'),en:"TheMainReasonsForRejectionOfTheApplicationForRegistration"}},
      {id:1,indexType:{ar:this.translate.instant('ReasonsForRefusingToRemoveAStudentFromASchool'),en:"ReasonsForRefusingToRemoveAStudentFromASchool"}},
      {id:2,indexType:{ar:this.translate.instant('TheMainReasonsForStudentDeletion'),en:"TheMainReasonsForStudentDeletion"}},
      {id:3,indexType:{ar:this.translate.instant('ReasonsForWithdrawingTheStudentFromTheCurrentSchool'),en:"ReasonsForWithdrawingTheStudentFromTheCurrentSchool"}},
      {id:4,indexType:{ar:this.translate.instant('TheReasonForRejectingTheWithdrawalRequest'),en:"TheReasonForRejectingTheWithdrawalRequest"}},
      {id:5,indexType:{ar:this.translate.instant('TheTypeOfTalentOfTheStudent'),en:"TheTypeOfTalentOfTheStudent"}},
      {id:6,indexType:{ar:this.translate.instant('ReasonsForRepeatingASpecificCourseOrSubject'),en:"ReasonsForRepeatingASpecificCourseOrSubject"}},
      {id:7,indexType:{ar:this.translate.instant('DiplomaType'),en:"DiplomaType"}},
      {id:8,indexType:{ar:this.translate.instant('TtypeOfCommunicationMessage'),en:"TtypeOfCommunicationMessage"}},
      {id:9,indexType:{ar:this.translate.instant('TypesOfFileAttachmentsForSchoolStaff'),en:"TypesOfFileAttachmentsForSchoolStaff"}},
      {id:10,indexType:{ar:this.translate.instant('TheTypeOfFileAttachmentForTheParent'),en:"TheTypeOfFileAttachmentForTheParent"}},
      {id:11,indexType:{ar:this.translate.instant('CitiesOfSharjah'),en:"CitiesOfSharjah"}},
      {id:12,indexType:{ar:this.translate.instant('CitiesOfTheCentralRegion'),en:"CitiesOfTheCentralRegion"}},
      {id:13,indexType:{ar:this.translate.instant('EasternProvinceCities'),en:"EasternProvinceCities"}},
      {id:14,indexType:{ar:this.translate.instant('TypesOfGradeImprovement'),en:"TypesOfGradeImprovement"}},
      {id:15,indexType:{ar:this.translate.instant('NationalityCategory'),en:"NationalityCategory"}},
      {id:16,indexType:{ar:this.translate.instant('SpecialEducation'),en:"SpecialEducation"}},
      {id:17,indexType:{ar:this.translate.instant('Language'),en:"Language"}},
      {id:18,indexType:{ar:this.translate.instant('ReasonsForIssuingBoardCertificate'),en:"ReasonsForIssuingBoardCertificate"}},
      {id:19,indexType:{ar:this.translate.instant('TheReasonForLackOfIdentification'),en:"TheReasonForLackOfIdentification"}},
      {id:20,indexType:{ar:this.translate.instant('TheReasonForAbsent'),en:"TheReasonForAbsent"}}
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
