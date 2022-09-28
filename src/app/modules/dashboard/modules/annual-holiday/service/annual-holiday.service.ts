import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnnualHoliday } from 'src/app/core/Models/iannual-holiday';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AnnualHolidayService {
  schoolYear: number = 0;
  private httpoption;
  cities: string[];
  annualHolidayList: IAnnualHoliday[] = [];
  constructor(private httpclient: HttpClient) {
    this.httpoption = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json'
        }
      )
    };
    this.annualHolidayList = [
      { 'id': 1, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday': {'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculum':'الأسترالي'}, 'year': "2022", 'createdDate': '4/07/2022' },
      { 'id': 2, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday': {'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'غير مرنة','curriculum':'الأسترالي'}, 'year': "2022", 'createdDate': '4/07/2022' },
      { 'id': 3, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday':{'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculum':'الأسترالي'}, 'year': "2022",  'createdDate': '4/07/2022' },
      { 'id': 4, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday':{'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculum':'الأسترالي'}, 'year': "2022", 'createdDate': '4/07/2022' },
      { 'id': 5, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday': {'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'غير مرنة','curriculum':'الأسترالي'}, 'year': "2022", 'createdDate': '4/07/2022' },
      { 'id': 6, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday': {'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculum':'الأسترالي'}, 'year': "2022", 'createdDate': '4/07/2022' },
      { 'id': 7, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday': {'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculum':'الأسترالي'}, 'year': "2022",  'createdDate': '4/07/2022'},
      { 'id': 8, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday':{'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'غير مرنة','curriculum':'الأسترالي'}, 'year': "2022", 'createdDate': '4/07/2022' },
      { 'id': 9, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday': {'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'غير مرنة','curriculum':'الأسترالي'}, 'year': "2022",  'createdDate': '4/07/2022' },
      { 'id': 10, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday':{'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculum':'الأسترالي'}, 'year': "2022",  'createdDate': '4/07/2022' },
      { 'id': 11, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday': {'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculum':'الأسترالي'}, 'year': "2022", 'createdDate': '4/07/2022' },
      { 'id': 12, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday': {'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'غير مرنة','curriculum':'الأسترالي'}, 'year': "2022", 'createdDate': '4/07/2022' },
      { 'id': 13, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday': {'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculum':'الأسترالي'}, 'year': "2022",  'createdDate': '4/07/2022'},
      { 'id': 14, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday': {'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'غير مرنة','curriculum':'الأسترالي'}, 'year': "2022", 'createdDate': '4/07/2022' },
      { 'id': 15, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday': {'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculum':'الأسترالي'}, 'year': "2022",  'createdDate': '4/07/2022'},
      { 'id': 16, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday': {'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'غير مرنة','curriculum':'الأسترالي'}, 'year': "2022", 'createdDate': '4/07/2022' },
      { 'id': 17, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday': {'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculum':'الأسترالي'}, 'year': "2022",'createdDate': '4/07/2022' },
      { 'id': 18, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday': {'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'غير مرنة','curriculum':'الأسترالي'}, 'year': "2022", 'createdDate': '4/07/2022' },
      { 'id': 19, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday': {'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'غير مرنة','curriculum':'الأسترالي'}, 'year': "2022", 'createdDate': '4/07/2022' },
      { 'id': 20, 'smester': "الاجازات السنوية لعام 2023 - 2022", 'holiday':{'name':'الأجازة السنوية','dateTo':"23/08",'dateFrom':"22/07",'flexibilityStatus':'مرنة','curriculum':'الأسترالي'}, 'year': "2022", 'createdDate': '4/07/2022'}
    ];
    this.cities = [
      "2022",
      "Rome",
      "London",
      "Istanbul"

    ];
  }

 
}
