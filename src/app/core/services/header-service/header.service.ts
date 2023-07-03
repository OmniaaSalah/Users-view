import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHeader } from '../../Models/header-dashboard';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public Header = new BehaviorSubject<IHeader>({} as IHeader);


  constructor() {

  }

  changeHeaderdata(data: IHeader) {
    this.Header.next(data)

  }


}
