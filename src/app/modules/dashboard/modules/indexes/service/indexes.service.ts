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
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'Somalia' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'United States' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'Russia' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'China' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'Mongolia' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'Bhutan' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'Peru' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'Niger' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'Argentina' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'Greece' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'Indonesia' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'Finland' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'Philippines' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'Bosnia and Herzegovina' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'Bolivia' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'China' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'Finland' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'Portugal' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'Madagascar' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'Greece' }
    ];
    this.cities = [
      "New York",
      "Rome",
      "London",
      "Istanbul",
      "Paris"
    ];
  }
}
