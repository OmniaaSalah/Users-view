import { Component, OnInit,inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';

@Component({
  selector: 'app-child-details',
  templateUrl: './child-details.component.html',
  styleUrls: ['./child-details.component.scss']
})
export class ChildDetailsComponent implements OnInit {

  faArrowRight = faArrowRight
  faCheck = faCheck
  faClose = faClose
  currentUserScope = inject(UserService).getScope()
  isRegistered= this.route.snapshot.queryParamMap.get('registered') || 'false'
  childId= this.route.snapshot.paramMap.get('childId');
  parentId = Number(this.route.snapshot.paramMap.get('parentId'));
  step = 1
  regestered:false
  componentHeaderData: IHeader ;


  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private route : ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this. checkDashboardHeader();
    this.headerService.changeHeaderdata(this.componentHeaderData)

  }

  checkDashboardHeader()
  {
      if(this.currentUserScope==UserScope.Employee)
    {

		this.componentHeaderData={
      breadCrump: [
        { label: this.translate.instant('parents.parents') ,routerLink:'/student-management/all-parents/',routerLinkActiveOptions:{exact: true}},
        { label: this.translate.instant('parents.childrenList') ,routerLink:`/student-management/all-parents/parent/${this.parentId}/all-children`,routerLinkActiveOptions:{exact: true}},
        { label: this.translate.instant('parents.sonDetails'),routerLink:`/student-management/all-parents/parent/${this.parentId}/child/${this.childId}` }

      ],
      mainTitle: { main: this.translate.instant('parents.sonDetails') }
    }
    }
    else if (this.currentUserScope==UserScope.SPEA)
    {
        this.componentHeaderData={
          breadCrump: [
            { label: this.translate.instant('parents.parents') ,routerLink:'/schools-and-students/all-parents/',routerLinkActiveOptions:{exact: true}},
            { label: this.translate.instant('parents.childrenList') ,routerLink:`/schools-and-students/all-parents/parent/${this.parentId}/all-children`,routerLinkActiveOptions:{exact: true}},
            { label: this.translate.instant('parents.sonDetails')  ,routerLink:`/schools-and-students/all-parents/parent/${this.parentId}/child/${this.childId}`}

          ],
          mainTitle: { main: this.translate.instant('parents.sonDetails') }
        }
    } else if (this.currentUserScope==UserScope.Guardian){
      this.componentHeaderData={
        breadCrump: [
          { label: this.translate.instant('parents.sonDetails')  ,routerLink:`/parent/${this.parentId}/child/${this.childId}`}

        ],
        mainTitle: { main: this.translate.instant('parents.sonDetails') }
      }
    }
  }
}
