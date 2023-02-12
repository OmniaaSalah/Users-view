import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, Observable } from 'rxjs';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { RouteListenrService } from 'src/app/shared/services/route-listenr/route-listenr.service';

@Component({
  selector: 'app-dashboard-panal',
  templateUrl: './dashboard-panal.component.html',
  styleUrls: ['./dashboard-panal.component.scss']
})
export class DashboardPanalComponent implements OnInit {

  activRoute$ = this.routeListenrService.activeRoute$
  activChildRoute$ = this.routeListenrService.activeChildRoute$


  firstChildHoverd = false
  lastChildHoverd = false


  panalGroups=[

    {
      id: RouteEnums.SCHOOLS_AND_STUDENTS,
      children:[
        {
          title:'sideBar.schoolsAndStudents.chidren.schools',
          key: RouteEnums.Schools,
          url:'/dashboard/schools-and-students/schools',
          icon:'assets/images/sideBar/schools-students/graduation-cap.svg'
        },
        {
          title:'sideBar.schoolsAndStudents.chidren.students',
          key: RouteEnums.Students,
          url:'/dashboard/schools-and-students/students',
          icon:'assets/images/sideBar/schools-students/graduate-student.svg'
        },
        {
          title:'sideBar.schoolsAndStudents.chidren.parents',
          key: RouteEnums.Guardians,
          url:'/dashboard/schools-and-students/all-parents',
          icon:'assets/images/sideBar/schools-students/parents.svg'
        },
      ]
    },

    {
      id: RouteEnums.PEFORMANCE_MANAGMENT,
      children:[
        {
          title:'sideBar.performanceManagment.chidren.exams',
          key: RouteEnums.Exams,
          url:'dashboard/performance-managment/schools',
          icon:'assets/images/sideBar/performance-managment/list.svg'
        },
        {
          title:'sideBar.performanceManagment.chidren.missions',
          key: RouteEnums.Requests,
          url:'/dashboard/performance-managment/RequestList/',
          icon:'assets/images/sideBar/performance-managment/note-list.svg'
        },
        {
          title:'breadcrumb.Notifications',
          key: RouteEnums.Notifications,
          url:'/dashboard/performance-managment/notifications/',
          icon:'assets/images/sideBar/performance-managment/note-list.svg'
        }
      ]
    },

    {
      id:RouteEnums.MANAGAR_TOOLS,
      children:[
        {
          title:'sideBar.managerTools.children.Users',
          key: RouteEnums.Users,
          url:'/dashboard/manager-tools/user-information/users-list',
          icon:'assets/images/sideBar/system-manager-tools/users.svg'
        },
        {
          title:'sideBar.managerTools.children.Job Roles',
          key: RouteEnums.Roles,
          url:'/dashboard/manager-tools/user-roles/user-roles-list',
          icon:'assets/images/sideBar/system-manager-tools/user.svg'

        },
        {
          title:'sideBar.managerTools.children.System List',
          key: RouteEnums.Indexes,
          url:'/dashboard/manager-tools/indexes/indexes-list',
          icon:'assets/images/sideBar/system-manager-tools/list.svg'
        },
        {
          title:'sideBar.managerTools.children.systemSettings',
          key: RouteEnums.Settings,
          url:'/dashboard/manager-tools/settings',
          icon:'assets/images/sideBar/system-manager-tools/fix.svg'
        }
      ]
    },

    {
      id: RouteEnums.REPORTS_MANAGEMENT,
      children:[
        {
          title:'تقرير الطلاب',
          key: RouteEnums.R_Students,
          icon:'assets/images/sideBar/report-managment/report-user.svg',
          url:'/dashboard/reports-managment/students-reports'
        },
        {
          title:'تقرير اولاياء الأمور',
          key: RouteEnums.R_Guardians,
          icon:'assets/images/sideBar/report-managment/report.svg',
          url:'/dashboard/reports-managment/parents-reports'
        },
        {
          title:'تقرير الغياب والحضور',
          key: RouteEnums.R_AbsenceRecord,
          icon:'assets/images/sideBar/report-managment/report-edge.svg',
          url:'/dashboard/reports-managment/attendance-reports'
        },
        {
          title:'تقرير المدارس',
          key: RouteEnums.R_Schools,
          icon:'assets/images/sideBar/report-managment/report-marked.svg',
          url:'/dashboard/reports-managment/schools-reports'
        },
        {
          title:'تقرير الدرجات',
          key: RouteEnums.R_Degrees,
          icon:'assets/images/sideBar/report-managment/report-content.svg',
          url:'/dashboard/reports-managment/degrees-reports'
        },
        {
          title:'تقرير الموظفين',
          key: RouteEnums.R_Employees,
          icon:'assets/images/sideBar/report-managment/report-user.svg',
          url:'/dashboard/reports-managment/users-reports'
        },
        {
          title:'تقرير المعلمين',
          key: RouteEnums.R_Teachers,
          icon:'assets/images/sideBar/report-managment/report-marked.svg',
          url:'/dashboard/reports-managment/teachers-reports'
        },
        {
          title:'تقرير المواد الدراسيه',
          key: RouteEnums.R_Subjects,
          icon:'assets/images/sideBar/report-managment/report-line.svg',
          url:'/dashboard/reports-managment/subjects-reports'
        },
      ]
    },

    {
      id:RouteEnums.EDUCATIONAL_SETTING,
      children:[
        {
          title:'sideBar.educationalSettings.children.Annual Holidays',
          key: RouteEnums.AnnaulHolidays,
          url:'/dashboard/educational-settings/annual-holiday/annual-holiday-list',
          icon:'assets/images/sideBar/educational-setting/calender.svg'
        },
        {
          title:'sideBar.educationalSettings.children.School Years',
          key: RouteEnums.SchoolYears,
          url:'/dashboard/educational-settings/school-year/school-years-list',
          icon:'assets/images/sideBar/educational-setting/calender-user.svg'

        },
        {
          title:'sideBar.educationalSettings.children.Subjects',
          key: RouteEnums.Subjects,
          url:'/dashboard/educational-settings/subject/subjects-list',
          icon:'assets/images/sideBar/educational-setting/micro.svg'

        },
        {
          title:'sideBar.educationalSettings.children.Subjects Assessments',
          key: RouteEnums.Assessments,
          url:'/dashboard/educational-settings/assessments/assements-list',
          icon:'assets/images/sideBar/educational-setting/note-marked.svg'

        },

        {
          title:'sideBar.educationalSettings.children.surveysList',
          key: RouteEnums.Surveys,
          url:'/dashboard/educational-settings/surveys',
          icon:'assets/images/sideBar/educational-setting/note-list.svg'

        },

      ]

    },

    // Employee Scope
    {
      id: RouteEnums.Grades_Divisions_Management,
      children:[
        {
          title:'صفوف المدرسه',
          url:`/dashboard/grades-and-divisions/school/2/grades`,
          icon:'assets/images/sideBar/schools-students/parents.svg'
        },
        {
          title:'شعب المدرسه',
          url:`/dashboard/grades-and-divisions/school/2/divisions`,
          icon:'assets/images/sideBar/performance-managment/note-list.svg'
        }
      ]
    },
    {
      id: RouteEnums.School_Management,
      children:[
        {
          title:'معلومات عامة',
          key: RouteEnums.S_GeneralInfo,
          url:`/dashboard/school-management/school/2`,
          icon:'assets/images/sideBar/schools-students/parents.svg'
        },
        {
          title:' المواد الدراسيّة',
          key: RouteEnums.S_Subjects,
          url:`/dashboard/school-management/school/2/subjects`,
          icon:'assets/images/sideBar/educational-setting/calender.svg'
        },
        {
          title:'الاجازات السنوية',
          key: RouteEnums.S_AnnualHoliday,
          url:`/dashboard/school-management/school/2/annual-holidays`,
          icon:'assets/images/sideBar/educational-setting/calender-user.svg'
        },
        {
          title:'قائمة التعديلات',
          key: RouteEnums.S_EditList,
          url:`/dashboard/school-management/school/2/edit-list`,
          icon:'assets/images/sideBar/performance-managment/note-list.svg'
        },
      ]
    },
    {
      id: RouteEnums.Student_Management,
      children:[
        {
          title:'أولياء الأمور',
          key: RouteEnums.Guardians,
          url:`/dashboard/student-management/all-parents`,
          icon:'assets/images/sideBar/schools-students/parents.svg'
        },
        {
          title:'الطلاب',
          key: RouteEnums.Students,
          url:`/dashboard/student-management/students`,
          icon:'assets/images/sideBar/schools-students/graduate-student.svg'
        },
        {
          title:'الطلبات',
          key: RouteEnums.Requests,
          url:`/dashboard/performance-managment//RequestList`,
          icon:'assets/images/sideBar/performance-managment/note-list.svg'
        }
      ]
    },
    {
      id: RouteEnums.SchoolEmployee_Management,
      children:[
        {
          title:'الموظفين',
          key: RouteEnums.S_Employees,
          url:`/dashboard/schoolEmployee-management/school/2/employees`,
          icon:'assets/images/sideBar/schools-students/parents.svg'
        },
      ]
    },

  ]


  constructor(
    private translate:TranslateService,
    private routeListenrService:RouteListenrService) { }

  ngOnInit(): void {

  }

  onFirstChildHoverd(){
    this.firstChildHoverd = true
  }

  onFirstChildLeaved(){
      this.firstChildHoverd = false
  }

  onLastChildHoverd(){
    this.lastChildHoverd = true
  }

  onLastChildLeaved(){

    this.lastChildHoverd = false
  }

}
