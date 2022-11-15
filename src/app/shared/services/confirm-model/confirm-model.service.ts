import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModelService {

  isOpend$ = new BehaviorSubject(false)
  message$ = new BehaviorSubject(this.translate.instant('shared.confirmDelete'))
  confirmed$ = new BehaviorSubject(null)


  constructor(private translate:TranslateService) { }

  openModel(message?:string){
    if(message) this.message$.next(message)
    this.isOpend$.next(true)
  }

  closeModel(){
    this.isOpend$.next(false)
  }
}
