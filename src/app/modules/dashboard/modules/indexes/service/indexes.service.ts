import { Injectable } from '@angular/core';
import { IIndexs } from 'src/app/core/Models/iindex';
import { take } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http-handler.service';
@Injectable({
  providedIn: 'root'
})
export class IndexesService {
  listType: string[];
  indexesList: IIndexs[] = [];
  constructor(private http:HttpHandlerService) {
    this.listType = [
      "RejectionRegestrationReasons" ,
        "DeletingStudentReasons" ,
        "RejectionRegestrationForDeletionReasons" ,
        "StudentWithdrawalReasons" ,
        "RejectingWithdrawalRequest" ,
        "StudentTalentType" ,
        "RegradingSchoolStageOrSubjectReasons" ,
        "DiplomaType" ,
        "CommunicationMessageType" ,
        "FileAttachmentsForSchoolEmployeeType" ,
        "FileAttachmentsForGuardianType" ,
        "SharjahCities" ,
        "DubaiCities" ,
        "AjmanCities" ,
        "FujairahCities"
    ];
  }


  getAllIndexes(filter:Partial<Filter>)
  {
    return this.http.get('/IndexList',filter).pipe(take(1));
    
  }

  addIndex(Index:IIndexs)
  {
    console.log(Index);
    return this.http.post('/IndexList',Index);
    
      
  }
    
    
  
}
