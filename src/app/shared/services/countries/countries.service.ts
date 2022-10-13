import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, take } from 'rxjs';
import { City } from 'src/app/core/models/cities/citiy.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { CitiesEnum } from '../../enums/cities/city.enum';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  cities: City[]=[
    this.translate.instant('cities.'+ CitiesEnum.SharjahCity),
    this.translate.instant('cities.'+ CitiesEnum.CentralRegion),
    this.translate.instant('cities.'+ CitiesEnum.EasternProvince)
  ]


  states=[

  ]
  constructor(
    private translate :TranslateService,
    private http: HttpHandlerService
  ) { }

  getCountries(){
    return this.http.get('/Nationality').pipe(take(1))
  }

  getAllStates(){
    return this.http.get('/Address/state').pipe(take(1), map((res) => res.data))
  }


  getState(stateId){
    return this.http.get('/Address/state/'+stateId).pipe(take(1))
  }

  

}
