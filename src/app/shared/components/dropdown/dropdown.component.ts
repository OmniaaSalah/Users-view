import { Component, EventEmitter, Input, OnInit, Output ,inject} from '@angular/core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'src/app/core/models/dropdown/menu-item';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { ClaimsEnum } from '../../enums/claims/claims.enum';



@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() label;
  @Input() items:MenuItem[]
  @Input() styleClass;
  @Output() onItemClicked = new EventEmitter()
  get claimsEnum () {return ClaimsEnum}
  faEllipsisVertical=faEllipsisVertical

  lang = inject(TranslationService).lang
  constructor() { }

  ngOnInit(): void {

  }

  onClick(index){
    this.onItemClicked.emit(index);
  }
}
