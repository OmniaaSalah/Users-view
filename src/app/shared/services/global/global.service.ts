import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  booleanOptions= [
    {name: this.translate.instant('shared.yes'), value:true}, 
    {name: this.translate.instant('shared.no'), value:false}
  ]

  constructor(private translate :TranslateService) { }
}
