import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent implements OnInit {

  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.parents.sendRegisterReq') ,routerLink:'/parent/child/2/register-request',routerLinkActiveOptions:{exact: true}},
    ],
    mainTitle: { main: this.translate.instant('dashboard.parents.sonDetails') }
  }


  constructor(
    private translate: TranslateService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
  }

}
