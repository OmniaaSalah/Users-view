import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from '../../services/header-service/header.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';

@Component({
  selector: 'app-not-allowed',
  templateUrl: './not-allowed.component.html',
  styleUrls: ['./not-allowed.component.scss']
})
export class NotAllowedComponent implements OnInit, OnDestroy {

  notFoundMessage
  componentHeaderData={
    breadCrump: [
      // { label: this.translate.instant('parents.parents'),routerLink:'/student-management/all-parents/',routerLinkActiveOptions:{exact: true} },
      { label: this.translate.instant('shared.notFoundPage'),routerLink:`/oops/page-not-allowed` }
    ],
    mainTitle: { main: '' }
  }

  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private sharedService:SharedService
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
    console.log(this.sharedService.notFoundMessage);

    this.notFoundMessage= localStorage.getItem('notFoundMessage') || this.translate.instant('emptyList.accessDenied')
  }

 ngOnDestroy(): void {
     localStorage.removeItem('notFoundMessage')
 }

}
