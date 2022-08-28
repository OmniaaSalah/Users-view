import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  activeGroup = new BehaviorSubject('')

  constructor() { }
}
