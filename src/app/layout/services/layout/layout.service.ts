import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type theme = 'light' | 'dark';
@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public message=new BehaviorSubject<string>("");
  messageBackGroundColor=new BehaviorSubject<string>("");
  // light or dark
   bgColor$ = new BehaviorSubject<theme>('light')

  constructor() { }


  changeTheme(theme :theme){
    this.bgColor$.next(theme)
  }
}
