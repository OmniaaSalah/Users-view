import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, observable, Observable } from 'rxjs';

import { HeaderObj } from '../../Models/header-obj';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  breadCrump: MenuItem[];
  home: MenuItem;
  mainTittle:string;
  public Header= new BehaviorSubject<HeaderObj>({}as HeaderObj);
  constructor() {

   }
  
  
}
