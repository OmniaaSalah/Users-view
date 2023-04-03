import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';

interface modelData{
  message?:string,
  img?:string
}
@Injectable({
  providedIn: 'root'
})
export class ConfirmModelService {
  confirmMessage = {message: this.translate.instant('shared.confirmDelete'), img:'assets/images/empty-list/basket.svg'};
  isOpend$ = new BehaviorSubject(false)
  confirmModelData$ = new BehaviorSubject<modelData>(this.confirmMessage)
  confirmed$ = new BehaviorSubject(null)
  onClose$ = new BehaviorSubject(null)



  constructor(private translate:TranslateService) { }

  openModel(config: modelData =this.confirmMessage){
    this.confirmModelData$.next(config)
    this.isOpend$.next(true)
  }

  closeModel(){
    this.isOpend$.next(false)

  }
}
