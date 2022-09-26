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
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'غير فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' },
      { 'ListType': 'أسباب الرفض الرئيسية لطلب التسجيل', 'indexStatus': 'فعال', 'indexName': 'المرفقات غير مكتملة' }
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
