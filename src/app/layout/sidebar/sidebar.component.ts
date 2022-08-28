import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

export enum SidbarGroupsEnum{
  EDUCATIONAL_SETTING = 'EDUCATIONAL_SETTING',
  REPORTS_MANAGEMENT = 'REPORTS_MANAGEMENT',
  SCHOOLS_AND_STUDENTS = 'SCHOOLS_AND_STUDENTS',
  MANAGAR_TOOLS = 'MANAGAR_TOOLS',
  PEFORMANCE_MANAGMENT = 'PEFORMANCE_MANAGMENT',
  SCHOOL_STUDENTS = 'SCHOOL_STUDENTS',
  COMMUNICATION_MANAGMENT ='COMMUNICATION_MANAGMENT',
  SCHOOL_INFO = 'SCHOOL_INFO'
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  faArrowLeft= faArrowLeft
  faArrowRight= faArrowRight

  activGroup: SidbarGroupsEnum

  sideBarGroups=[
    {
      name: SidbarGroupsEnum.SCHOOLS_AND_STUDENTS,
      title: 'sideBar.schoolsAndStudents.title',
      children:[
        {
          title:'sideBar.schoolsAndStudents.chidren.schools',
          url:'dashboard/schools-and-students/schools',
          icon:'assets/images/sideBar/graduate-student.svg'
        },
        {
          title:'sideBar.schoolsAndStudents.chidren.students',
          url:'dashboard/schools-and-students/schools',
          icon:'assets/images/sideBar/graduation-cap.svg'
        },
        {
          title:'sideBar.schoolsAndStudents.chidren.parents',
          url:'dashboard/schools-and-students/schools',
          icon:'assets/images/sideBar/parents.svg'
        },
      ]
    },

    {
      title: 'sideBar.performanceManagment',
      childeren:[
        {
          title:'مدارس',
          url:'dashboard/performance-managment/schools',
          icon:'assets/images/sideBar/graduate-student.svg'
        }
      ]
    },

    {
      title: 'sideBar.educationalSettings',
      childeren:[
        {
          title:'مدارس',
          url:'dashboard/educational-settings/schools',
          icon:'assets/images/sideBar/graduate-student.svg'
        }
      ]
    },
    {
      title: 'sideBar.managerTools',
      childeren:[
        {
          title:'مدارس',
          url:'dashboard/manager-tools/schools',
          icon:'assets/images/sideBar/graduate-student.svg'
        }
      ]
    },

    {
      title: 'sideBar.reportsManagment',
      childeren:[
        {
          title:'مدارس',
          url:'dashboard/reports-managment/schools',
          icon:'assets/images/sideBar/graduate-student.svg'
        }
      ]
    },

    {
      title: 'sideBar.comunicationAndmanagment',
      childeren:[
        {
          title:'مدارس',
          url:'dashboard/comunication-managment/schools',
          icon:'assets/images/sideBar/graduate-student.svg'
        }
      ]
    },
    {
      title: 'sideBar.schoolInfo',
      childeren:[
        {
          title:'مدارس',
          url:'dashboard/school-info/schools',
          icon:'assets/images/sideBar/graduate-student.svg'
        }
      ]
    },

  ]

  constructor(private router:Router, private translate:TranslateService) { }

  ngOnInit(): void {
    
    let url = this.router.url
    this.routeListner(url)
  }


  routeListner(url? : string){
    if(url) this.checkRouteInclude(url)
    
    this.router.events
    .pipe(filter( event =>event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => this.checkRouteInclude(event.url) )

  }

  
  checkRouteInclude(url: string){

    if(url.indexOf('schools-and-students') > -1){        
      this.activGroup = SidbarGroupsEnum.SCHOOLS_AND_STUDENTS

    } else if(url.indexOf('performance-managment') > -1){
      this.activGroup = SidbarGroupsEnum.PEFORMANCE_MANAGMENT

    }else if(url.indexOf('educational-settings') > -1){
      this.activGroup = SidbarGroupsEnum.EDUCATIONAL_SETTING

    }else if(url.indexOf('manager-tools') > -1){
      this.activGroup = SidbarGroupsEnum.MANAGAR_TOOLS

    }else if(url.indexOf('reports-managment') > -1){
      this.activGroup = SidbarGroupsEnum.REPORTS_MANAGEMENT
      
    }else if(url.indexOf('communication-managment') > -1){
      this.activGroup = SidbarGroupsEnum.COMMUNICATION_MANAGMENT

    }else if(url.indexOf('school-info') > -1){
      this.activGroup = SidbarGroupsEnum.SCHOOL_INFO

    }
  }

}
