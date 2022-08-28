import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  items: MenuItem[];
  home: MenuItem;
  header:string;
  constructor() { }
}
