import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type theme = 'light' | 'dark';
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  // light or dark
  bgColor$ = new BehaviorSubject<theme>('light')

  constructor() { }


  changeTheme(theme :theme){
    this.bgColor$.next(theme)
  }
}
