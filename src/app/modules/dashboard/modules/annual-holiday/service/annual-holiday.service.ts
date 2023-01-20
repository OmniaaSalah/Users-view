import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import {take,  delay,BehaviorSubject,finalize,map } from 'rxjs';
import { IAnnualHoliday } from 'src/app/core/Models/annual-holidays/annual-holiday';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { environment } from 'src/environments/environment';
import { Filter } from 'src/app/core/Models/filter/filter';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';

@Injectable({
  providedIn: 'root'
})
export class AnnualHolidayService {
  openModel = new BehaviorSubject(false);
  schoolYear: number = 0;
  holidayStatusList;
  yearList;
  lang = inject(TranslationService).lang
  cities: string[];
  annualHolidayList;
  public holidayList= new BehaviorSubject<[]>([]);
  public holiday= new BehaviorSubject<{}>({});
  public editedHoliday= new BehaviorSubject<{}>(null);
  public annualCalendarName= new BehaviorSubject<string>("");
  public year= new BehaviorSubject<string>("");
  constructor(private http:HttpHandlerService,private translate:TranslateService, private loaderService: LoaderService) {

    this.holidayStatusList=[
      {
        value:StatusEnum.Flexible,name:this.translate.instant("shared.allStatus.Flexible")
      },
      {
        value:StatusEnum.NotFlexible,name:this.translate.instant("shared.allStatus.NotFlexible")
      }
    ];
  
  }

  getAllHolidays(filter:Partial<Filter>)
  {
    this.loaderService.isLoading$.next(true);
    return this.http.get('/Holiday/annual-calenders',filter).pipe(take(1),finalize(()=> {
      this.loaderService.isLoading$.next(false)
    }));
    
  }
  getAnnualHolidayByID(holidayId:number)
  {
    return this.http.get(`/Holiday/annual-holiday/${holidayId}`).pipe(take(1))
  }
  getHolidaysByAnnualCalenderID(annualCalenderID:number)
  {
    this.loaderService.isLoading$.next(true);
    // return this.http.get(`/Holiday/holidays/${annualCalenderID}`).pipe(take(1));
    return this.http.get(`/Holiday/holidays/${annualCalenderID}`).pipe(take(1),finalize(()=> {
      this.loaderService.isLoading$.next(false);
    }));
  }
  getHolidayByID(holidayId:number)
  {
    return this.http.get(`/Holiday/holiday/${holidayId}`).pipe(take(1))
  }

  deleteHoliday(holidayId:number)
  {

    return this.http.delete('/Holiday', {},{id:holidayId}).pipe(take(1));

  }
  addAnnualHoliday(holiday)
  {
   
    return this.http.post('/Holiday/holiday/annual',holiday);
    
      
  }
  updateAnnualHoliday(holidayId:number,holiday)
  {
    return this.http.put(`/Holiday/holiday/annual/${holidayId}`,holiday).pipe(take(1))
  }

  updateHoliday(holidayId:number,holiday)
  {
 
    return this.http.put(`/Holiday/holiday/${holidayId}`,holiday).pipe(take(1))
  }

  getAllcurriculumName()
  {
    return this.http.get('/Curriculum').pipe(take(1));
    
  }

  getAllYears()
  {
    return this.http.get('/Holiday/calender-year').pipe(take(1));
    
  }
 
  annualToExport(filter){
    return this.http.get('/Holiday/annual-calenders',filter)
    .pipe(
      map(res=>{
        return res.data.map(annualHoliday =>{
          return {
            [this.translate.instant('dashboard.AnnualHoliday.Annual Calender Name')]: annualHoliday?.annualCalenderName[this.lang],
            [this.translate.instant('dashboard.AnnualHoliday.Year')]: annualHoliday?.year,
      

          }
        })
      }))
  }
 
}
