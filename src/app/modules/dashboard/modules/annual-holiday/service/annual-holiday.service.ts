import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnnualHoliday } from 'src/app/core/Models/iannual-holiday';
import { HttpHandlerService } from 'src/app/core/services/http-handler.service';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs';
import { Filter } from 'src/app/core/Models/filter/filter';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class AnnualHolidayService {
  schoolYear: number = 0;
  holidayStatusList;
  
  private httpoption;
  cities: string[];
  annualHolidayList: IAnnualHoliday[] = [];
  constructor(private http:HttpHandlerService,private translate:TranslateService) {

    this.holidayStatusList=[
      {'id':1,'name':this.translate.instant("flexible")},
      {'id':2,'name':this.translate.instant("not Flexible")}
    ];
    this.cities = [
      "2022",
      "Rome",
      "London",
      "Istanbul"

    ];
  }

  getAllHolidays(filter:Partial<Filter>)
  {
    return this.http.get('/Holiday/holiday/annual',filter).pipe(take(1));
    
  }

  getAllCurriculum()
  {
    return this.http.get('/Curriculum').pipe(take(1));
    
  }

  getAllYear()
  {
    return this.http.get('/Holiday/holiday/year').pipe(take(1));
    
  }
 

 
}
