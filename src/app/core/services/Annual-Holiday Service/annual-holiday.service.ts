import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AnnualHoliday } from '../../Models/annual-holiday';

@Injectable({
  providedIn: 'root'
})
export class AnnualHolidayService {
  private httpoption;
  constructor(private httpclient: HttpClient) { 
    this.httpoption={
      headers:new HttpHeaders(
        {
          'Content-Type':'application/json'
        }
      )
    }
  }

  GetAllHolidayforschool(schoolid:number):Observable<AnnualHoliday[]>
  {
    //put the remain of url
    return this.httpclient.get<AnnualHoliday[]>(environment.serverUrl+'ReminderofApiurlhereeeeeee'+schoolid);
  }
  getHolidayByID(Holidayid:number):Observable<AnnualHoliday>
  {
    //put the remain of url
    return this.httpclient.get<AnnualHoliday>(environment.serverUrl+'ReminderofApiurlhereeeeeee'+Holidayid);
  }
  AddProduct(newHoliday:AnnualHoliday) :Observable<AnnualHoliday>
  {
     //put the remain of url
    return this.httpclient.post<AnnualHoliday>(environment.serverUrl+'',JSON.stringify(newHoliday),this.httpoption);
  }
  EditProduct(newHoliday:AnnualHoliday,HolidayID:number):Observable<AnnualHoliday>
  {
    //put the remain of url
   
    return this.httpclient.put<AnnualHoliday>(environment.serverUrl+''+HolidayID,newHoliday);
  }
}
