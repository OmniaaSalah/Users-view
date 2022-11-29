import { Component, OnInit,inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';

@Component({
  selector: 'app-child-details',
  templateUrl: './child-details.component.html',
  styleUrls: ['./child-details.component.scss']
})
export class ChildDetailsComponent implements OnInit {

  faArrowRight = faArrowRight
  faCheck = faCheck
  faClose = faClose
  currentUserScope = inject(UserService).getCurrentUserScope()
  isRegistered= this.route.snapshot.queryParamMap.get('registered')
  childId= Number(this.route.snapshot.paramMap.get('childId'));
  parentId = Number(this.route.snapshot.paramMap.get('parentId'));
  step = 1
  regestered:false
  componentHeaderData: IHeader ;


  student =
    {
      name: 'محمد على',
      age: 15,
      regestered: true,
      regesteredSchool: 'مدرسه الشارقه الابتدائيه',
      school: 'مدرسه الشارقه',
      class: 'الصف الرابع',
      relativeRelation: 'ابن الاخ',
      src: 'assets/images/avatar.png'
    }



  constructor(
    private layoutService: LayoutService,
    private translate: TranslateService,
    private headerService: HeaderService,
    private route : ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this. checkDashboardHeader();
    this.headerService.changeHeaderdata(this.componentHeaderData)
console.log(this.childId)
  }

  checkDashboardHeader()
  {
      if(this.currentUserScope=='Employee')
    {
   
		this.componentHeaderData={
      breadCrump: [
        { label: this.translate.instant('dashboard.parents.parents') ,routerLink:'/dashboard/student-management/all-parents/',routerLinkActiveOptions:{exact: true}},
        { label: this.translate.instant('dashboard.parents.childrenList') ,routerLink:`/dashboard/student-management/all-parents/parent/${this.parentId}/all-children`,routerLinkActiveOptions:{exact: true}},
        { label: this.translate.instant('dashboard.parents.sonDetails'),routerLink:`/dashboard/student-management/all-parents/parent/${this.parentId}/child/${this.childId}` }
  
      ],
      mainTitle: { main: this.translate.instant('dashboard.parents.sonDetails') }
    }
    }
    else if (this.currentUserScope=='SPEA')
    {
		this.componentHeaderData={
      breadCrump: [
        { label: this.translate.instant('dashboard.parents.parents') ,routerLink:'/dashboard/schools-and-students/all-parents/',routerLinkActiveOptions:{exact: true}},
        { label: this.translate.instant('dashboard.parents.childrenList') ,routerLink:`/dashboard/student-management/all-parents/parent/${this.parentId}/child/${this.childId}`,routerLinkActiveOptions:{exact: true}},
        { label: this.translate.instant('dashboard.parents.sonDetails') }
  
      ],
      mainTitle: { main: this.translate.instant('dashboard.parents.sonDetails') }
    }
    }
  }
}
