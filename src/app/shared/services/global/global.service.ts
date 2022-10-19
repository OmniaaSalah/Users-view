import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { HttpHandlerService } from 'src/app/core/services/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  booleanOptions= [
    {name: this.translate.instant('shared.yes'), value:true},
    {name: this.translate.instant('shared.no'), value:false}
  ]

  constructor(
    private translate :TranslateService,
    private http: HttpHandlerService
    ) { }

  getAllCurriculum(){
    return this.http.get('/Curriculum').pipe(take(1))
  }
}
