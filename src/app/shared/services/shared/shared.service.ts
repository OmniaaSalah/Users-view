import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, share, shareReplay, take } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { StatusEnum } from '../../enums/status/status.enum';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  booleanOptions= [
    {name: this.translate.instant('shared.yes'), value:true}, 
    {name: this.translate.instant('shared.no'), value:false}
  ]

  statusOptions =[
    this.translate.instant('shared.allStatus.'+StatusEnum.Active), 
    this.translate.instant('shared.allStatus.'+ StatusEnum.Inactive)
  ]

  
  constructor(
    private translate :TranslateService,
    private http: HttpHandlerService
  ) { }

  getAllCurriculum(){
    return this.http.get('/Curriculum')
    .pipe(
      take(1),
      map((res)=> res.data))
  }

  getAllDivisions(){
    return this.http.get(`/Division`).pipe(take(1),map(val => val.data))
  }

  getAllGrades(){
    return this.http.get(`/Grade`).pipe(take(1),map(val => val.data))
  }

  getAllTraks(){
    return this.http.get(`/Track`).pipe(take(1),map(val => val.data))
  }

}
