import { Component, OnInit,inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { IHeader, ITitle } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  homePage=inject(TranslateService).get('Home Page')

  notificationNumber: number = 0;
  breadCrump: MenuItem[]
  mainTitle: ITitle;
  subTitle: ITitle;
  showNoOfNotifications = false;
  showNoOfMessages = false;
  messageNumber:number = 0
  acceptIcon = faCheck;
  rejectIcon = faClose;
  showNotificationActionBtn = false;
  constructor(
    private headerService: HeaderService) { }

  ngOnInit(): void {

    this.headerService.Header.subscribe((response: IHeader) => {

      this.breadCrump = response.breadCrump;
      this.mainTitle = response?.mainTitle;
      this.subTitle = response?.subTitle;
      // this.showContactUs = response?.showContactUs;
      // this.showNoOfNotifications = response?.showNoOfNotifications;
      // this.showNoOfMessages = response?.showNoOfMessages;
      // this.showNotificationActionBtn = response?.showNotificationActionBtn;

    });

    // this.notificationService.notificationNumber.subscribe((response) => { this.notificationNumber = response });
    // this.messageService.messageNumber.subscribe((response) => { this.messageNumber = response });

  }




}
