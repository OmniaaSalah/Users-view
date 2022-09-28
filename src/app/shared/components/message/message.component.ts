import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';

import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  // @In('content') content='';
  claseIcon=faClose ;
  message:string="";
  messageBackGroundColor:string="";
  constructor(private layoutService:LayoutService) { }

  ngOnInit(): void {
    this.layoutService.message.subscribe((res)=>{this.message=res});
    this.layoutService.messageBackGroundColor.subscribe((res)=>{this.messageBackGroundColor=res;});
  }
  closeMe()
  {
    
    this.layoutService.message.next("");
  }

}
