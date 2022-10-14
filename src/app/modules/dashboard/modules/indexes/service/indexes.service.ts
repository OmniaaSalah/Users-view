import { Injectable } from '@angular/core';
import { IIndexs } from 'src/app/core/Models/iindex';
import { take,  delay,BehaviorSubject,finalize } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
@Injectable({
  providedIn: 'root'
})
export class IndexesService {
  indexListType;
  indexStatusList;
  indexesList: IIndexs[] = [];
  constructor(private http:HttpHandlerService,private translate:TranslateService, private loaderService: LoaderService) {
    this.indexListType = [
      {'id':0,'arabicName':this.translate.instant("RejectionRegestrationReasons"),'englishName':"RejectionRegestrationReasons"} ,
      {'id':1,'arabicName':this.translate.instant("DeletingStudentReasons"),'englishName':"DeletingStudentReasons"} ,
      {'id':2,'arabicName':this.translate.instant("RejectionRegestrationForDeletionReasons"),'englishName':"RejectionRegestrationForDeletionReasons"} ,
      {'id':3,'arabicName':this.translate.instant("StudentWithdrawalReasons"),'englishName':"StudentWithdrawalReasons"} ,
      {'id':4,'arabicName':this.translate.instant("RejectingWithdrawalRequest"),'englishName':"RejectingWithdrawalRequest"} ,
      {'id':5,'arabicName':this.translate.instant("StudentTalentType"),'englishName':"StudentTalentType"} ,
      {'id':6,'arabicName':this.translate.instant("RegradingSchoolStageOrSubjectReasons"),'englishName':"RegradingSchoolStageOrSubjectReasons"} ,
      {'id':7,'arabicName':this.translate.instant("DiplomaType"),'englishName':"DiplomaType"} ,
      {'id':8,'arabicName':this.translate.instant("CommunicationMessageType"),'englishName':"CommunicationMessageType"} ,
      {'id':9,'arabicName':this.translate.instant("FileAttachmentsForSchoolEmployeeType"),'englishName':"FileAttachmentsForSchoolEmployeeType"} ,
      {'id':10,'arabicName':this.translate.instant("FileAttachmentsForGuardianType"),'englishName':"FileAttachmentsForGuardianType"} ,
      {'id':11,'arabicName':this.translate.instant("SharjahCities"),'englishName':"SharjahCities"} ,
      {'id':12,'arabicName':this.translate.instant("DubaiCities"),'englishName': "DubaiCities"},
      {'id':13,'arabicName':this.translate.instant("AjmanCities") ,'englishName':"AjmanCities"},
      {'id':14,'arabicName':this.translate.instant("FujairahCities"),'englishName':"FujairahCities"}
    ];
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

  getIndextTypeList()
  { 
   
    return this.http.get('/IndexList/indexTypes').pipe(take(1));

  }
    
 

  addIndex(index)
  {
    console.log(index);
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
    
    
  
}
