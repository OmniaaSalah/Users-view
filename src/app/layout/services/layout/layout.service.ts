import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  bgColor$ = new BehaviorSubject('light')

  constructor() { }
}
