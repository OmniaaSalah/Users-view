import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { iheader } from 'src/app/core/Models/iheader';
import { inotification } from 'src/app/core/Models/inotification';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-view-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  iteration:number=0;
  activeLoadBtn:boolean=false;
  notificationsList:inotification[]=[];
  componentHeaderData: iheader={
		breadCrump: [
			{label: this.translate.instant('breadcrumb.Notifications') }
			
		],
		mainTitle:{ main:this.translate.instant('breadcrumb.Notifications')},
		showNoOfNotifications:true
	}

  constructor(private headerService: HeaderService, private router: Router, private translate: TranslateService, private NotificationService: NotificationService) { }

  ngOnInit(): void {
    this.NotificationService.NotificationsList.subscribe((res)=>{this.notificationsList=res.slice(this.iteration,this.iteration+=2); });
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.NotificationService.NotificationNumber.next(this.NotificationService.NotificationsAPIList.length);
  }

  GetNotReadable()
  {
   

  }
  GetReadable()
  {

  }
  LoadMore()
  {
    this.NotificationService.NotificationsList.subscribe((res)=>{this.notificationsList.push(...res.slice(this.iteration,this.iteration+=2))});
    if(this.NotificationService.NotificationsAPIList.length==this.notificationsList.length)
    {this.activeLoadBtn=true;}
  }

  ShowDetails(NotificationId: number) {
    this.router.navigate(['/notifications/notification-details/', NotificationId]);
  }

}
