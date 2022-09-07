import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderObj } from '../../Models/header-obj';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public Header= new BehaviorSubject<HeaderObj>({}as HeaderObj);


  constructor() {

   }

   changeHeaderdata(data: HeaderObj){

    if(!data.showContactUs) this.Header.next({...data, showContactUs:false})
    else this.Header.next(data)
   }
  
  
}
