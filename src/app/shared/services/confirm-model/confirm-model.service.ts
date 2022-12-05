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

  isOpend$ = new BehaviorSubject(false)
  confirmModelData$ = new BehaviorSubject<modelData>({message: this.translate.instant('shared.confirmDelete'), img:'assets/images/empty-list/basket.svg'})
  confirmed$ = new BehaviorSubject(null)
  onClose$ = new BehaviorSubject(null)



  constructor(private translate:TranslateService) { }

  openModel(config?: modelData){
    if(config) this.confirmModelData$.next(config)
    this.isOpend$.next(true)
  }

  closeModel(){
    this.isOpend$.next(false)

  }
}
