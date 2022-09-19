import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {  NgxSpinnerService } from 'ngx-spinner';
import { IHeader } from 'src/app/core/Models/iheader';
import { INotification } from 'src/app/core/Models/inotification';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-view-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  iteration:number=0;
  currentNotificationNumber:number=0;
  allNotificationNumber:number=0;
  activeLoadBtn:boolean=false;
  notificationsList:INotification[]=[];
  showSpinner:boolean=false;
  componentHeaderData: IHeader={
		breadCrump: [
			{label: this.translate.instant('breadcrumb.Notifications') ,routerLinkActiveOptions:{exact: true}}
			
		],
		mainTitle:{ main:this.translate.instant('breadcrumb.Notifications')},
		showNoOfNotifications:true
	}

  constructor(private headerService: HeaderService, private router: Router, private translate: TranslateService, private notificationService: NotificationService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.notificationService.notificationsList.subscribe((res)=>{this.notificationsList=res.slice(this.iteration,this.iteration+=2);this.currentNotificationNumber=this.notificationsList.length;this.showSpinner=true; });
   
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.allNotificationNumber=this.notificationService.notificationsAPIList.length;
    this.notificationService.notificationNumber.next(this.notificationService.notificationsAPIList.length);
  }

  getNotReadable()
  {
   

  }
  getReadable()
  {

  }
  onScroll()
  {

    if(this.notificationService.notificationsAPIList.length==this.notificationsList.length)
    { this.showSpinner=false;}
    else
    { this.showSpinner=true;}  


    this.loadMore();
    
  }
 
  loadMore()
  {
    
    this.notificationService.notificationsList.subscribe((res)=>{this.notificationsList.push(...res.slice(this.iteration,this.iteration+=2));this.currentNotificationNumber=this.notificationsList.length;});
    console.log("loaded more");
    
  }

  showDetails(NotificationId: number) {
    this.router.navigate(['/notifications/notification-details/', NotificationId]);
  }

}
