import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { HeaderObj, Title } from 'src/app/core/models/header-obj';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { NotificationService } from 'src/app/modules/notifications/service/notification.service';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.scss']
})
export class HeaderDashboardComponent implements OnInit {
  NotificationNumber: number = 0;
  breadCrump: MenuItem[]
  mainTitle: Title;
  subTitle: Title;
  showContactUs = false;
  showNoOfNotifications = false;
  Accepticon = faCheck;
  Rejecticon = faClose;
  showAcceptbtn = false;
  showRejectbtn = false;
  constructor(private headerService: HeaderService, private NotificationService: NotificationService) { }

  ngOnInit(): void {

    this.headerService.Header.subscribe((response: HeaderObj) => {
      this.breadCrump = response.breadCrump;
      this.mainTitle = response?.mainTitle;
      this.subTitle = response?.subTitle;
      this.showContactUs = response?.showContactUs;
      this.showNoOfNotifications = response?.showNoOfNotifications;
      this.showAcceptbtn = response?.showAcceptbtn;
      this.showRejectbtn = response?.showRejectbtn;
    });

    this.NotificationService.NotificationNumber.subscribe((response) => { this.NotificationNumber = response });



  }


}
