import { Component, OnInit, Input } from '@angular/core';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  @Input('rejectLabel') rejectLabel='';
  @Input('acceptLabel') acceptLabel='';
  @Input('content') content='';
  constructor(private layoutService:LayoutService) { }

  ngOnInit(): void {
  }
reject()
{

}
accept()
{
  this.layoutService.message.next('dashboard.UserRole.Job Role deleted Successfully');
  this.layoutService.messageBackGroundColor.next("green");
}
}
