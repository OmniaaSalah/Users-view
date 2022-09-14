import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Iheader } from 'src/app/core/Models/iheader';
import { Inotification } from 'src/app/core/Models/inotification';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-view-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  iteration:number=0;
  activeLoadBtn:boolean=false;
  notificationsList:Inotification[]=[];
  componentHeaderData: Iheader={
		breadCrump: [
			{label: this.translate.instant('breadcrumb.Notifications') }
			
		],
		mainTitle:{ main:this.translate.instant('breadcrumb.Notifications')},
		showNoOfNotifications:true
	}

  constructor(private headerService: HeaderService, private router: Router, private translate: TranslateService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.NotificationsList.subscribe((res)=>{this.notificationsList=res.slice(this.iteration,this.iteration+=2); });
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.notificationService.NotificationNumber.next(this.notificationService.NotificationsAPIList.length);
  }

  GetNotReadable()
  {
   

  }
  GetReadable()
  {

  }
  LoadMore()
  {
    this.notificationService.NotificationsList.subscribe((res)=>{this.notificationsList.push(...res.slice(this.iteration,this.iteration+=2))});
    if(this.notificationService.NotificationsAPIList.length==this.notificationsList.length)
    {this.activeLoadBtn=true;}
  }

  ShowDetails(NotificationId: number) {
    this.router.navigate(['/notifications/notification-details/', NotificationId]);
  }

}
