import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Iheader, Ititle } from 'src/app/core/Models/iheader';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { NotificationService } from 'src/app/modules/notifications/service/notification.service';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.scss']
})
export class HeaderDashboardComponent implements OnInit {
  notificationNumber: number = 0;
  breadCrump: MenuItem[]
  mainTitle: Ititle;
  subTitle: Ititle;
  showContactUs = false;
  showNoOfNotifications = false;
  Accepticon = faCheck;
  Rejecticon = faClose;
  showAcceptBtn = false;
  showRejectBtn = false;
  constructor(private headerService: HeaderService, private NotificationService: NotificationService) { }

  ngOnInit(): void {

    this.headerService.Header.subscribe((response: Iheader) => {
      this.breadCrump = response.breadCrump;
      this.mainTitle = response?.mainTitle;
      this.subTitle = response?.subTitle;
      this.showContactUs = response?.showContactUs;
      this.showNoOfNotifications = response?.showNoOfNotifications;
      this.showAcceptBtn = response?.showAcceptBtn;
      this.showRejectBtn = response?.showRejectBtn;
    });

    this.NotificationService.NotificationNumber.subscribe((response) => { this.notificationNumber = response });



  }


}
