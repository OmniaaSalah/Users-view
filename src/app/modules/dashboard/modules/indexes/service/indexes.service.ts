import { Injectable } from '@angular/core';
import { IIndexs } from 'src/app/core/Models/iindex';
import { take, BehaviorSubject } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class IndexesService {
  indexListType;
  indexStatusList;
  indexesList: IIndexs[] = [];
  constructor(private http:HttpHandlerService,private translate:TranslateService) {
    this.indexListType = [
      {'id':0,'name':this.translate.instant("RejectionRegestrationReasons")} ,
      {'id':1,'name':this.translate.instant("DeletingStudentReasons")} ,
      {'id':2,'name':this.translate.instant("RejectionRegestrationForDeletionReasons")} ,
      {'id':3,'name':this.translate.instant("StudentWithdrawalReasons")} ,
      {'id':4,'name':this.translate.instant("RejectingWithdrawalRequest")} ,
      {'id':5,'name':this.translate.instant("StudentTalentType")} ,
      {'id':6,'name':this.translate.instant("RegradingSchoolStageOrSubjectReasons")} ,
      {'id':7,'name':this.translate.instant("DiplomaType")} ,
      {'id':8,'name':this.translate.instant("CommunicationMessageType")} ,
      {'id':9,'name':this.translate.instant("FileAttachmentsForSchoolEmployeeType")} ,
      {'id':10,'name':this.translate.instant("FileAttachmentsForGuardianType")} ,
      {'id':11,'name':this.translate.instant("SharjahCities")} ,
      {'id':12,'name':this.translate.instant("DubaiCities") },
      {'id':13,'name':this.translate.instant("AjmanCities") },
      {'id':14,'name':this.translate.instant("FujairahCities")}
    ];
    this.indexStatusList=[
      {'id':1,'name':this.translate.instant("Active")},
      {'id':2,'name':this.translate.instant("Inactive")}
    ];
  }


  getAllIndexes(filter:Partial<Filter>)
  {
    return this.http.get('/IndexList',filter).pipe(take(1));
    
  }

  addIndex(index:IIndexs)
  {
    console.log(index);
    return this.http.post('/IndexList',index);
    
      
  }
  getIndexByID(indexId:number)
  {
    return this.http.get(`/IndexList/${indexId}`).pipe(take(1))
  }

  updateIndex(indexId:number,index:IIndexs)
  {
    console.log("service")
    return this.http.put(`/IndexList/${indexId}`,index).pipe(take(1))
  }
    
    
  
}
