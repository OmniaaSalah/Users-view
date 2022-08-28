import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HeaderObj } from '../../Models/header-obj';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  breadCrump: MenuItem[];
  home: MenuItem;
  mainTittle:string;
HeaderObj:HeaderObj;
  constructor() {

   }
   buildheader(obj:HeaderObj)
   {
     this.breadCrump=obj.breadCrump;
     this.home=obj.home;
     this.mainTittle=obj.mainTittle;
     
   }
}
