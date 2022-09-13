import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { iheader } from 'src/app/core/Models/iheader';
import { inotification } from 'src/app/core/Models/inotification';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { NotificationService } from '../../service/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.scss']
})
export class NotificationDetailsComponent implements OnInit {
  notificationslist: inotification[] = [];
  currentNotificationid: number = 0;
  currentNotification: inotification = {} as inotification;
  componentHeaderData: iheader = {
    breadCrump: [
      { label: this.translate.instant('breadcrumb.Notifications'), routerLink: '/notifications/notifications-list' },
      { label: this.translate.instant('Notifications.Notification details') }

    ],
    mainTitle: { main: this.translate.instant('Notifications.Notification details') },
    showAcceptbtn: true,
    showRejectbtn: true
  };


  constructor(private headerService: HeaderService, private activatedroute: ActivatedRoute, private translate: TranslateService, private NotificationService: NotificationService) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.NotificationService.NotificationsList.subscribe((res)=>{ this.notificationslist=res;});

    this.activatedroute.paramMap.subscribe(param => {
      this.currentNotificationid = Number(param.get('notificationId'));
      this.notificationslist.forEach(element => {
        if (element.id == this.currentNotificationid) { this.currentNotification = element; }
      });
    });





  }

}
