import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from '../../services/header-service/header.service';

@Component({
  selector: 'app-not-allowed',
  templateUrl: './not-allowed.component.html',
  styleUrls: ['./not-allowed.component.scss']
})
export class NotAllowedComponent implements OnInit {


  componentHeaderData={
    breadCrump: [
      // { label: this.translate.instant('dashboard.parents.parents'),routerLink:'/student-management/all-parents/',routerLinkActiveOptions:{exact: true} },
      // { label: this.translate.instant('dashboard.parents.childrenList'),routerLink:`/student-management/all-parents/parent/${this.parentId}/all-children` }
    ],
    mainTitle: { main: '' }
  }

  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
  }

}
