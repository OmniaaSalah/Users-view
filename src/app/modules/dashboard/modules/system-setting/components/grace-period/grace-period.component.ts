import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';

@Component({
  selector: 'app-grace-period',
  templateUrl: './grace-period.component.html',
  styleUrls: ['./grace-period.component.scss']
})
export class GracePeriodComponent implements OnInit {

  dashboardHeaderData:IHeader ={
    breadCrump:[
      { label: this.translate.instant('sideBar.managerTools.children.systemSettings'),routerLink: '/dashboard/manager-tools/settings',routerLinkActiveOptions:{exact: true} },
      { label: this.translate.instant('dashboard.SystemSetting.manageGracePeriod'),routerLink: '/dashboard/manager-tools/settings/grace-period/new' }

    ],
    mainTitle: {main:this.translate.instant('dashboard.SystemSetting.manageGracePeriod')}
  }

  diseases=[{name:'أمراض القلب'},{name:'فوبيا'},{name:'حساسيه'},{name:'السكرى'}];


  constructor(
    private headerService:HeaderService,
    private translate:TranslateService,) { }

  ngOnInit(): void {
    this.headerService.Header.next(this.dashboardHeaderData);

  }

}
