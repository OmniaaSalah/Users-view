import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iheader } from '../../Models/iheader';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public Header = new BehaviorSubject<iheader>({} as iheader);


  constructor() {

  }

  changeHeaderdata(data: iheader) {

    if (!data.showContactUs) this.Header.next({ ...data, showContactUs: false })
    else this.Header.next(data)
  }


}
