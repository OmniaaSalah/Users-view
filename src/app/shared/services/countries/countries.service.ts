import { Injectable ,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, of, take } from 'rxjs';
import { City } from 'src/app/core/models/cities/citiy.model';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { CitiesEnum } from '../../enums/cities/city.enum';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  lang = inject(TranslationService).lang
  allCountries
  allCities
  AllStates

  cities:{name:string,value: CitiesEnum}[]=[
    {name: this.translate.instant('cities.'+ CitiesEnum.SharjahCity), value: CitiesEnum.SharjahCity},
    {name: this.translate.instant('cities.'+ CitiesEnum.CentralRegion), value: CitiesEnum.CentralRegion},
    {name: this.translate.instant('cities.'+ CitiesEnum.EasternProvince), value: CitiesEnum.EasternProvince}
  ]


  states;
  constructor(
    private translate :TranslateService,
    private http: HttpHandlerService
  ) { }

  getCountries(){
    if(this.allCountries) return of(this.allCountries);
    
    return this.http.get(`/Nationality?SortColumnName=${this.lang=='ar'?'ArName':'EnName'}`).pipe(
      take(1),
      map((res) => {
        this.allCountries = res.data
        return res.data
      }))
  }

  getCities(){
    if(this.allCities) return of(this.allCities)
    return this.http.get(`/Address/cities?SortColumnName=${this.lang=='ar'?'ArabicName':'EnglishName'}`).pipe(
      take(1),
      map((res) => {
        this.allCities = res
        return res
      }))
  }

  getAllStates(){
    if(this.states) return of(this.states)
    return this.http.get(`/Address/states?SortColumnName=${this.lang=='ar'?'ArabicName':'EnglishName'}`).pipe(
      take(1),
       map((res) => {
        this.states = res.data
        return res.data
       }))
  }

  
  // getAllStates(cityId){
  //   return this.http.get(`/Address/city/${cityId}/state`).pipe(take(1), map((res) => res.data))
  // }


  getState(stateId){
    return this.http.get('/Address/state/'+stateId).pipe(take(1))
  }

  

}
