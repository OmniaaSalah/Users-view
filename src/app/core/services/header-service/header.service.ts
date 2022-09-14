import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHeader } from '../../Models/iheader';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public Header = new BehaviorSubject<IHeader>({} as IHeader);


  constructor() {

  }

  changeHeaderdata(data: IHeader) {

    if (!data.showContactUs) this.Header.next({ ...data, showContactUs: false })
    else this.Header.next(data)
  }


}
