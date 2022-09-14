import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iheader } from '../../Models/iheader';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public Header = new BehaviorSubject<Iheader>({} as Iheader);


  constructor() {

  }

  changeHeaderdata(data: Iheader) {

    if (!data.showContactUs) this.Header.next({ ...data, showContactUs: false })
    else this.Header.next(data)
  }


}
