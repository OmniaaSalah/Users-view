import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { ClaimsEnum } from '../../enums/claims/claims.enum';



@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input('items') items:MenuItem[]
  @Input('styleClass') styleClass;
  @Output() onItemClicked = new EventEmitter()
  get claimsEnum () {return ClaimsEnum}
  faEllipsisVertical=faEllipsisVertical


  constructor() { }

  ngOnInit(): void {
    
  }

  onClick(index){
    this.onItemClicked.emit(index);
  }
}
