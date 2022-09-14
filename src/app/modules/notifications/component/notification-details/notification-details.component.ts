import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Iheader } from 'src/app/core/Models/iheader';
import { Inotification } from 'src/app/core/Models/inotification';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { NotificationService } from '../../service/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.scss']
})
export class NotificationDetailsComponent implements OnInit {
  notificationsList: Inotification[] = [];
  currentNotificationId: number = 0;
  currentNotification: Inotification = {} as Inotification;
  componentHeaderData: Iheader = {
    breadCrump: [
      { label: this.translate.instant('breadcrumb.Notifications'), routerLink: '/notifications/notifications-list' },
      { label: this.translate.instant('Notifications.Notification details') }

    ],
    mainTitle: { main: this.translate.instant('Notifications.Notification details') },
    showAcceptBtn: true,
    showRejectBtn: true
  };


  constructor(private headerService: HeaderService, private activatedRoute: ActivatedRoute, private translate: TranslateService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.notificationService.NotificationsList.subscribe((res)=>{ this.notificationsList=res;});

    this.activatedRoute.paramMap.subscribe(param => {
      this.currentNotificationId = Number(param.get('notificationId'));
      this.notificationsList.forEach(element => {
        if (element.id == this.currentNotificationId) { this.currentNotification = element; }
      });
    });





  }

}
