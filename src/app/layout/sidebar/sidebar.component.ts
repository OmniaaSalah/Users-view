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
      name:SidbarGroupsEnum.MANAGAR_TOOLS,
      title:'sideBar.managerTools.title',
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
      name:SidbarGroupsEnum.EDUCATIONAL_SETTING,
      title:'sideBar.educationalSettings.title',
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

        }
      ]

    }

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
