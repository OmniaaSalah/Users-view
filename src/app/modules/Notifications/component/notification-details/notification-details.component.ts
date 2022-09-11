import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderObj } from 'src/app/core/Models/header-obj';
import { Notification } from 'src/app/core/Models/notification';
import { HeaderService } from 'src/app/core/services/Header/header.service';
import { NotificationService } from '../../service/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.scss']
})
export class NotificationDetailsComponent implements OnInit {
  NotificationsList:Notification[]=[];
  currentNotificationid:number=0;
  currentNotification:Notification={} as Notification;
  componentHeaderData: HeaderObj={
		breadCrump: [
			{label: this.translate.instant('breadcrumb.Notifications'),routerLink:'/Notifications/View-All-Notifications' },
      {label: this.translate.instant('Notifications.Notification details') }
			
		],
		mainTitle:{ main:this.translate.instant('Notifications.Notification details')},
		showAcceptbtn:true,
    showRejectbtn:true
	};
 

  constructor(private headerService:HeaderService,private activatedroute:ActivatedRoute,private translate:TranslateService,private NotificationService:NotificationService) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.NotificationsList=this.NotificationService.NotificationsList;

    this.activatedroute.paramMap.subscribe(param=>{
      this.currentNotificationid=Number(param.get('NID'));
      this.NotificationsList.forEach(element => {
        if(element.id==this.currentNotificationid)
          {this.currentNotification=element;}
      });
    });
  
    
   
   

  }

}
