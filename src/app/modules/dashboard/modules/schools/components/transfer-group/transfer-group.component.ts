import { Component, OnInit ,inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserScope } from 'src/app/shared/enums/user/user.enum';

@Component({
  selector: 'app-transfer-group',
  templateUrl: './transfer-group.component.html',
  styleUrls: ['./transfer-group.component.scss']
})
export class TransferGroupComponent implements OnInit {
  schoolId = this.route.snapshot.paramMap.get('schoolId')
  currentUserScope = inject(UserService).getCurrentUserScope()
  searchText=''
  selectedStudents=[];
  componentHeaderData: IHeader={
		breadCrump: [],
	}

  constructor(private headerService:HeaderService,private translate:TranslateService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.checkDashboardHeader();
    this.headerService.changeHeaderdata(this.componentHeaderData)

  }

  checkDashboardHeader()
  {
      if(this.currentUserScope==UserScope.Employee)
    {
      this.componentHeaderData.breadCrump=
      [
        {label:this.translate.instant('dashboard.schools.studentsList') ,routerLink:'/dashboard/student-management/students'},
        { label: this.translate.instant('dashboard.students.TransferStudentGroup'), routerLink: `/dashboard/school-management/school/${this.schoolId}/transfer-students`},
      ]

      
    }
    else if (this.currentUserScope==UserScope.SPEA)
    {
      this.componentHeaderData.breadCrump=
         [
          { label: this.translate.instant('breadcrumb.schoolList') , routerLink: '/dashboard/schools-and-students/schools',routerLinkActiveOptions:{exact: true}},
          { label: this.translate.instant('dashboard.students.TransferStudentGroup'), routerLink: `/dashboard/schools-and-students/schools/transfer-students`},
        ]

      
    }
  }
  get userScope() 
  { 
    return UserScope 
  }
}
