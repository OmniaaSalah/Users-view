import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderObj } from 'src/app/core/models/header-obj';
import { Notification } from 'src/app/core/models/notification';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-view-notification-list',
  templateUrl: './view-notification-list.component.html',
  styleUrls: ['./view-notification-list.component.scss']
})
export class ViewNotificationListComponent implements OnInit {

  NotificationsList: Notification[] = [];
  componentHeaderData: HeaderObj = {
    breadCrump: [
      { label: this.translate.instant('breadcrumb.Notifications') }

    ],
    mainTitle: { main: this.translate.instant('breadcrumb.Notifications') },
    showNoOfNotifications: true
  }

  constructor(private headerService: HeaderService, private router: Router, private translate: TranslateService, private NotificationService: NotificationService) { }

  ngOnInit(): void {
    this.NotificationsList = this.NotificationService.NotificationsList;
    this.headerService.changeHeaderdata(this.componentHeaderData);
    this.NotificationService.NotificationNumber.next(this.NotificationsList.length);
  }

  GetNotReadable() {


  }
  GetReadable() {

  }

  ShowDetails(NotificationId: number) {
    this.router.navigate(['/Notifications/Notification-Details/', NotificationId]);
  }

}
