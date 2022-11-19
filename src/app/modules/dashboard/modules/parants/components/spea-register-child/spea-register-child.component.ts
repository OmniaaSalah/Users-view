import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';


@Component({
  selector: 'app-spea-register-child',
  templateUrl: './spea-register-child.component.html',
  styleUrls: ['./spea-register-child.component.scss']
})
export class SpeaRegisterChildComponent implements OnInit {

  parentId = this.route.snapshot.paramMap.get('parentId')
  childId = this.route.snapshot.paramMap.get('childId')


  componentHeaderData: IHeader={
  breadCrump: [
    { label: this.translate.instant('dashboard.parents.parents') ,routerLink:'/dashboard/schools-and-students/all-parents/',routerLinkActiveOptions:{exact: true}},
    { label: this.translate.instant('dashboard.parents.childrenList') ,routerLink:`/dashboard/schools-and-students/all-parents/parent/${this.parentId}/all-children`,routerLinkActiveOptions:{exact: true}},
    {label: this.translate.instant('dashboard.students.registerChildByCommission'), routerLink: `/dashboard/schools-and-students/all-parents/parent/${this.parentId}/all-children/child/${this.childId}/register`}
  ],
  mainTitle: {
    main: this.translate.instant('dashboard.students.registerChildByCommission')
  }
}

constructor(
  private translate: TranslateService,
  private headerService: HeaderService,
  private route: ActivatedRoute

) { }

ngOnInit(): void {
  this.headerService.changeHeaderdata(this.componentHeaderData)
}


}
