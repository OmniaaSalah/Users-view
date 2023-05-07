import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { RouteListenrService } from 'src/app/shared/services/route-listenr/route-listenr.service';

@Component({
  selector: 'app-side-navigator',
  templateUrl: './side-navigator.component.html',
  styleUrls: ['./side-navigator.component.scss']
})
export class SideNavigatorComponent implements OnInit {

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
          url:'/schools-and-students/schools',
          icon:'assets/images/sideBar/schools-students/graduation-cap.svg'
        },
        {
          title:'sideBar.schoolsAndStudents.chidren.students',
          key: RouteEnums.Students,
          url:'/schools-and-students/students',
          icon:'assets/images/sideBar/schools-students/graduate-student.svg'
        },
        {
          title:'sideBar.schoolsAndStudents.chidren.parents',
          key: RouteEnums.Guardians,
          url:'/schools-and-students/all-parents',
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
          url:'/performance-managment/schools',
          icon:'assets/images/sideBar/performance-managment/list.svg'
        },
        {
          title:'sideBar.performanceManagment.chidren.missions',
          key: RouteEnums.Requests,
          url:'/performance-managment/RequestList/',
          icon:'assets/images/sideBar/performance-managment/note-list.svg'
        },
        {
          title:'sideBar.educationalSettings.children.Subjects Assessments',
          key: RouteEnums.Assessments,
          url:'/performance-managment/assessments/assements-list',
          icon:'assets/images/sideBar/educational-setting/note-marked.svg'

        },

      ]
    },

    {
      id:RouteEnums.MANAGAR_TOOLS,
      children:[
        {
          title:'sideBar.managerTools.children.Users',
          key: RouteEnums.Users,
          url:'/manager-tools/user-information/users-list',
          icon:'assets/images/sideBar/system-manager-tools/users.svg'
        },
        {
          title:'sideBar.managerTools.children.Job Roles',
          key: RouteEnums.Roles,
          url:'/manager-tools/user-roles/user-roles-list',
          icon:'assets/images/sideBar/system-manager-tools/user.svg'

        },
        {
          title:'sideBar.managerTools.children.System List',
          key: RouteEnums.Indexes,
          url:'/manager-tools/indexes/indexes-list',
          icon:'assets/images/sideBar/system-manager-tools/list.svg'
        },
        {
          title:'sideBar.managerTools.children.systemSettings',
          key: RouteEnums.Settings,
          url:'/manager-tools/settings',
          icon:'assets/images/sideBar/system-manager-tools/fix.svg'
        },
        {
          title:'breadcrumb.NotificationsSettings',
          key: RouteEnums.Notifications,
          url:'/manager-tools/notifications/',
          icon:'assets/images/sideBar/performance-managment/note-list.svg'
        }
      ]
    },

    {
      id: RouteEnums.REPORTS_MANAGEMENT,
      children:[
        {
          title:this.translate.instant('sideBar.reportsManagment.chidren.studentsReport'),
          key: RouteEnums.R_Students,
          icon:'assets/images/sideBar/report-managment/report-user.svg',
          url:'/reports-managment/students-reports'
        },
        {
          title:this.translate.instant('sideBar.reportsManagment.chidren.gurdiansReport'),
          key: RouteEnums.R_Guardians,
          icon:'assets/images/sideBar/report-managment/report.svg',
          url:'/reports-managment/parents-reports'
        },
        {
          title: this.translate.instant('sideBar.reportsManagment.chidren.attendanceReport'),
          key: RouteEnums.R_AbsenceRecord,
          icon:'assets/images/sideBar/report-managment/report-edge.svg',
          url:'/reports-managment/attendance-reports'
        },
        {
          title:this.translate.instant('sideBar.reportsManagment.chidren.schoolsReport'),
          key: RouteEnums.R_Schools,
          icon:'assets/images/sideBar/report-managment/report-marked.svg',
          url:'/reports-managment/schools-reports'
        },
        {
          title: this.translate.instant('sideBar.reportsManagment.chidren.gradesReport'),
          key: RouteEnums.R_Degrees,
          icon:'assets/images/sideBar/report-managment/report-content.svg',
          url:'/reports-managment/degrees-reports'
        },
        {
          title:this.translate.instant('sideBar.reportsManagment.chidren.EmployeesReport'),
          key: RouteEnums.R_Employees,
          icon:'assets/images/sideBar/report-managment/report-user.svg',
          url:'/reports-managment/users-reports'
        },
        {
          title:this.translate.instant('sideBar.reportsManagment.chidren.TeachersReport'),
          key: RouteEnums.R_Teachers,
          icon:'assets/images/sideBar/report-managment/report-marked.svg',
          url:'/reports-managment/teachers-reports'
        },
        {
          title:this.translate.instant('sideBar.reportsManagment.chidren.subjectsReport'),
          key: RouteEnums.R_Subjects,
          icon:'assets/images/sideBar/report-managment/report-line.svg',
          url:'/reports-managment/subjects-reports'
        },
      ]
    },

    {
      id:RouteEnums.EDUCATIONAL_SETTING,
      children:[
        {
          title:'sideBar.educationalSettings.children.Annual Holidays',
          key: RouteEnums.AnnaulHolidays,
          url:'/educational-settings/annual-holiday/annual-holiday-list',
          icon:'assets/images/sideBar/educational-setting/calender.svg'
        },
        {
          title:'sideBar.educationalSettings.children.School Years',
          key: RouteEnums.SchoolYears,
          url:'/educational-settings/school-year/school-years-list',
          icon:'assets/images/sideBar/educational-setting/calender-user.svg'

        },
        {
          title:'sideBar.educationalSettings.children.Subjects',
          key: RouteEnums.Subjects,
          url:'/educational-settings/subject/subjects-list',
          icon:'assets/images/sideBar/educational-setting/micro.svg'

        },

        {
          title:'sideBar.educationalSettings.children.surveysList',
          key: RouteEnums.Surveys,
          url:'/educational-settings/surveys',
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
          url:`/grades-and-divisions/school/2/grades`,
          icon:'assets/images/sideBar/schools-students/parents.svg'
        },
        {
          title:'شعب المدرسه',
          url:`/grades-and-divisions/school/2/divisions`,
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
          url:`/school-management/school/2`,
          icon:'assets/images/sideBar/schools-students/parents.svg'
        },
        {
          title:' المواد الدراسيّة',
          key: RouteEnums.S_Subjects,
          url:`/school-management/school/2/subjects`,
          icon:'assets/images/sideBar/educational-setting/calender.svg'
        },
        {
          title:'الاجازات السنوية',
          key: RouteEnums.S_AnnualHoliday,
          url:`/school-management/school/2/annual-holidays`,
          icon:'assets/images/sideBar/educational-setting/calender-user.svg'
        },
        {
          title:'قائمة التعديلات',
          key: RouteEnums.S_EditList,
          url:`/school-management/school/2/edit-list`,
          icon:'assets/images/sideBar/performance-managment/note-list.svg'
        },
        {
          title:this.translate.instant('dashboard.Requests.myRequests'),
          key: RouteEnums.MyRequests,
          queryParams:{isMyRequests:true},
          url:`/school-management/requests-list/my-requests`,
          icon:'assets/images/sideBar/performance-managment/note-list.svg'
        },
        {
          title:this.translate.instant('dashboard.Requests.requestsToMe'),
          key: RouteEnums.Requests,
          url:`/school-management/requests-list`,

          icon:'assets/images/sideBar/performance-managment/note-list.svg'
        }
      ]
    },
    {
      id: RouteEnums.Student_Management,
      children:[
        {
          title:'أولياء الأمور',
          key: RouteEnums.Guardians,
          url:`/student-management/all-parents`,
          icon:'assets/images/sideBar/schools-students/parents.svg'
        },
        {
          title:'الطلاب',
          key: RouteEnums.Students,
          url:`/student-management/students`,
          icon:'assets/images/sideBar/schools-students/graduate-student.svg'
        },

      ]
    },
    {
      id: RouteEnums.SchoolEmployee_Management,
      children:[
        {
          title:'الموظفين',
          key: RouteEnums.S_Employees,
          url:`/schoolEmployee-management/school/2/employees`,
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
