import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderObj } from 'src/app/core/Models/header-obj';
import { Notification } from 'src/app/core/Models/notification';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-view-notification-list',
  templateUrl: './view-notification-list.component.html',
  styleUrls: ['./view-notification-list.component.scss']
})
export class ViewNotificationListComponent implements OnInit {
  iteration:number=0;
  ActiveLoadbtn:boolean=false;
  Avilbleloaded:number=0;
  NotificationsList:Notification[]=[];
  componentHeaderData: HeaderObj={
		breadCrump: [
			{label: this.translate.instant('breadcrumb.Notifications') }
			
		],
		mainTitle:{ main:this.translate.instant('breadcrumb.Notifications')},
		showNoOfNotifications:true
	}

  constructor(private headerService:HeaderService,private router:Router,private translate:TranslateService,private NotificationService:NotificationService) { }

  ngOnInit(): void {
    this.NotificationService.NotificationsList.subscribe((res)=>{this.NotificationsList=res.slice(this.iteration,this.iteration+=2); console.log(this.NotificationsList);});
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
    this.NotificationService.NotificationsList.subscribe((res)=>{this.NotificationsList.push(...res.slice(this.iteration,this.iteration+=2))});
    if(this.NotificationService.NotificationsAPIList.length==this.NotificationsList.length)
    {this.ActiveLoadbtn=true;}
  }

  ShowDetails(NotificationId:number)
  {
    this.router.navigate(['/Notifications/Notification-Details/',NotificationId]);
  }

}
