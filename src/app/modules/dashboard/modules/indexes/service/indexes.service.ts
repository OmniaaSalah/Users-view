import { Injectable } from '@angular/core';
import { IIndexs } from 'src/app/core/Models/iindex';
import { take } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http-handler.service';
@Injectable({
  providedIn: 'root'
})
export class IndexesService {
  cities: string[];
  indexesList: IIndexs[] = [];
  constructor(private http:HttpHandlerService) {

    // this.indexesList = [
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة','checked':true },
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة' ,'checked':false},
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة','checked':true },
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة','checked':true },
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة','checked':false },
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة' ,'checked':false},
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة' ,'checked':false},
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة' ,'checked':false},
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة','checked':true },
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة','checked':true },
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' ,'checked':true},
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' ,'checked':true},
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة','checked':true },
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة','checked':false },
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' ,'checked':true},
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة','checked':true },
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة','checked':false },
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة','checked':false },
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' ,'checked':true},
    //   { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة','checked':true }
  
    // ];
    this.cities = [
      "New York",
      "Rome",
      "London",
      "Istanbul"
      
    ];
  }


  getAllIndexes(filter:Partial<Filter>)
  {
    return this.http.get('/IndexList',filter).pipe(take(1));
    
  }
}
