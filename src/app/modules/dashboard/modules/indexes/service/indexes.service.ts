import { Injectable } from '@angular/core';
import { IIndexs } from 'src/app/core/Models/iindex';

@Injectable({
  providedIn: 'root'
})
export class IndexesService {
  cities: string[];
  indexesList: IIndexs[] = [];
  constructor() {

    this.indexesList = [
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة','checked':true },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة' ,'checked':false},
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة','checked':true },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة','checked':true },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة','checked':false },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة' ,'checked':false},
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة' ,'checked':false},
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة' ,'checked':false},
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة','checked':true },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة','checked':true },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' ,'checked':true},
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' ,'checked':true},
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة','checked':true },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة','checked':false },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' ,'checked':true},
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة','checked':true },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة','checked':false },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة','checked':false },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' ,'checked':true},
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة','checked':true }
    ];
    this.cities = [
      "New York",
      "Rome",
      "London",
      "Istanbul"
      
    ];
  }
}
