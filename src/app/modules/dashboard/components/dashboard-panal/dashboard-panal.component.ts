import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, Observable } from 'rxjs';
import { DashboardPanalEnums } from 'src/app/shared/enums/dashboard-panal/dashboard-panal.enum';
import { RouteListenrService } from 'src/app/shared/services/route-listenr/route-listenr.service';

@Component({
  selector: 'app-dashboard-panal',
  templateUrl: './dashboard-panal.component.html',
  styleUrls: ['./dashboard-panal.component.scss']
})
export class DashboardPanalComponent implements OnInit {

  activRoute$: Observable<DashboardPanalEnums> = this.routeListenrService.activeRoute$


  firstChildHoverd = false
  lastChildHoverd = false


  panalGroups=[

    {
      id: DashboardPanalEnums.SCHOOLS_AND_STUDENTS,
      children:[
        {
          title:'sideBar.schoolsAndStudents.chidren.schools',
          url:'dashboard/schools-and-students/schools',
          icon:'assets/images/sideBar/schools/graduation-cap.svg'
        },
        {
          title:'sideBar.schoolsAndStudents.chidren.students',
          url:'dashboard/schools-and-students/schools',
          icon:'assets/images/sideBar/schools/graduate-student.svg'
        },
        {
          title:'sideBar.schoolsAndStudents.chidren.parents',
          url:'dashboard/schools-and-students/schools',
          icon:'assets/images/sideBar/schools/parents.svg'
        },
      ]
    },

    {
      id: DashboardPanalEnums.PEFORMANCE_MANAGMENT,
      childeren:[
        {
          title:'sideBar.performanceManagment.chidren',
          url:'dashboard/performance-managment/schools',
          icon:'assets/images/sideBar/graduate-student.svg'
        }
      ]
    },
    
    { 
      id:DashboardPanalEnums.MANAGAR_TOOLS,
      children:[
        {
          title:'sideBar.managerTools.children.Users',
          url:'/dashboard/manager-tools/UserInformation/ViewUsersList',
          icon:'assets/images/sideBar/Users.svg'
        },
        {
          title:'sideBar.managerTools.children.Job Roles',
          url:'/dashboard/manager-tools/UserRoles/ViewUserRoles',
          icon:'assets/images/sideBar/JobRole.svg'

        },
        {
          title:'sideBar.managerTools.children.System List',
          url:'/dashboard/manager-tools/Indexes/View-SystemList',
          icon:'assets/images/sideBar/Indexes.svg'

        }
      ]
    },

    {
      id: DashboardPanalEnums.REPORTS_MANAGEMENT,
      children:[
        {
          title:'تقرير الطلاب', 
          icon:'assets/images/home/report-managment/report-user.svg', 
          url:'/dashboard/reports-managment'
        },
        {
          title:'تقرير اولاياء الأمور', 
          icon:'assets/images/home/report-managment/report.svg', 
          url:'/dashboard/reports-managment'
        },
        {
          title:'تقرير الغياب والحضور', 
          icon:'assets/images/home/report-managment/report-edge.svg', 
          url:'/dashboard/reports-managment'
        },
        {
          title:'تقرير المدارس', 
          icon:'assets/images/home/report-managment/report-marked.svg', 
          url:'/dashboard/reports-managment'
        },
        {
          title:'تقرير الدرجات', 
          icon:'assets/images/home/report-managment/report-content.svg', 
          url:'/dashboard/reports-managment'
        },
        {
          title:'تقرير الموظفين', 
          icon:'assets/images/home/report-managment/report-user.svg', 
          url:'/dashboard/reports-managment'
        },
        {
          title:'تقرير المعلمين', 
          icon:'assets/images/home/report-managment/report-marked.svg', 
          url:'/dashboard/reports-managment'
        },
        {
          title:'تقرير المواد الدراسيه', 
          icon:'assets/images/home/report-managment/report-line.svg', 
          url:'/dashboard/reports-managment'
        },
      ]
    },

    {
      id:DashboardPanalEnums.EDUCATIONAL_SETTING,
      children:[
        {
          title:'sideBar.educationalSettings.children.Annual Holidays',
          url:'/dashboard/educational-settings/AnnualHoliday/ViewSpecific/:SID',
          icon:'assets/images/sideBar/AnnualHoliday.svg'
        },
        {
          title:'sideBar.educationalSettings.children.Subjects',
          url:'/dashboard/educational-settings/Subjects/ViewSubjectList',
          icon:'assets/images/sideBar/Subjects.svg'

        },
        {
          title:'sideBar.educationalSettings.children.Subjects Assessments',
          url:'/dashboard/educational-settings/Assessments/View-Assements-List',
          icon:'assets/images/sideBar/Assessment.svg'

        }
      ]

    }

  ]
  

  constructor(
    private translate:TranslateService,
    private routeListenrService:RouteListenrService) { }

  ngOnInit(): void {
    
  }

  onFirstChildHoverd(){
    console.log('hoverd');
    
    this.firstChildHoverd = true
  }

  onFirstChildLeaved(){
    console.log('leave');
    
      this.firstChildHoverd = false
  }

  onLastChildHoverd(){
    this.lastChildHoverd = true
  }

  onLastChildLeaved(){

    this.lastChildHoverd = false
  }

}
