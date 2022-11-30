
import { Component, EventEmitter, inject, NgZone, OnInit, Output } from '@angular/core';
import {  Router } from '@angular/router';
import { faAngleDown, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import {  fromEvent } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { NotificationService } from 'src/app/modules/notifications/service/notification.service';
import { slide } from 'src/app/shared/animation/animation';
import { DashboardPanalEnums } from 'src/app/shared/enums/dashboard-panal/dashboard-panal.enum';
import { ClaimsEnum } from 'src/app/shared/enums/permissions/permissions.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { RouteListenrService } from 'src/app/shared/services/route-listenr/route-listenr.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';

interface MenuItem{
  id:number
  title:string
  claims:ClaimsEnum[],
  enum: DashboardPanalEnums,
  links:{}[]
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[slide]
})
export class HeaderComponent implements OnInit {

  currentUserScope = inject(UserService).getCurrentUserScope();
  get ScopeEnum(){return UserScope}
  get claimsEnum() {return ClaimsEnum}
  currentSchoolId=inject(UserService).getCurrentSchoollId();
  YEAR_Id=''

  paddingStyle:string="2rem";
  paddingTopStyle:string="2rem";
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  isInDashboard;
  message:string="";
  faAngleDown = faAngleDown
  faArrowLeft = faArrowLeft

  classes={
    // 'on-scroll': false
  }

  activeRoute$=this.routeListenrService.activeRoute$

  isMenuOpend= false
  activeMenuItem:MenuItem
  activeMenuItemChanged =false

  menuItems: MenuItem[] ;

  notificationsList=[]
  checkLanguage:boolean = false
  isChecked:boolean = false
  searchModel = {
    "keyword": null,
    "sortBy": null,
    "page": 1,
    "pageSize": 2,
    "isRead": null
  }

  constructor(
    private toastr:ToastrService,
    private router: Router,
    private translate:TranslateService,
    private userService: UserService,
    private routeListenrService:RouteListenrService,
    private zone: NgZone,
    private notificationService: NotificationService,
    private sharedService:SharedService
    ) { }


  ngOnInit(): void {
  
      this.loadMenuItems(this.currentSchoolId);
    
    
  

    if(localStorage.getItem('$AJ$token')){
    this.getNotifications(this.searchModel)
    }else{
      return
    }
    if(localStorage.getItem('preferredLanguage')=='ar'){
      this.checkLanguage = true
    }else{
      this.checkLanguage = false
    }
    this.setupScrollListener()
  }


  getNotifications(searchModel){
    this.notificationService.getAllNotifications(searchModel).subscribe(res=>{
      this.notificationsList = res.data
    })
  }
  getNotReadable()
  {
    this.searchModel.keyword = null
    this.searchModel.page = 1
    this.searchModel.pageSize = 2
    this.searchModel.isRead = false
    this.getNotifications(this.searchModel)
  }
  getReadable()
  {
    this.searchModel.keyword = null
    this.searchModel.page = 1
    this.searchModel.pageSize = 2
    this.searchModel.isRead = true
    this.getNotifications(this.searchModel)
  }

  private setupScrollListener() {

    this.zone.runOutsideAngular(() => {

      fromEvent(window, "scroll").subscribe((e:any) => {

        if (e.target.scrollingElement.scrollTop <= 1) {

          this.zone.run(() => this.classes['on-scroll'] =false);

        }else if(e.target.scrollingElement.scrollTop > 1 && e.target.scrollingElement.scrollTop < 7){

          this.zone.run(() => this.classes['on-scroll'] =true);
        }

      });

    })

  }

  logout() {
    this.userService.clear();
    this.router.navigate(['/auth/login']);
  }


  onSwitchLanguage() {
    

  }


  openMenu(index){

    if(this.activeMenuItem && this.activeMenuItem?.id == index + 1){

       this.isMenuOpend = !this.isMenuOpend
      this.activeMenuItemChanged = true

    } else{
      this.activeMenuItemChanged = false
      this.activeMenuItem = this.menuItems[index];
      this.isMenuOpend = true

      setTimeout(()=>{
        this.activeMenuItemChanged = true
      },320)
    }
    this.activeMenuItem = this.menuItems[index];
   

  }

  atclickOutside(){
    this.isMenuOpend = false
  }

  onDateSelected(e){
  

  }

  changeStatus(value){
    if(value=='0'){
      this.isChecked= false
      this.getNotifications(this.searchModel = {
        "keyword": null,
        "sortBy": null,
        "page": 1,
        "pageSize": 2,
        "isRead": null
      })
    }
    if(value=='1'){
      this.isChecked= false
      this.getReadable()
    }
    if(value=='2'){
      this.isChecked= true
      this.getNotReadable()
    }
}
goToNotificationDetails(pageLink){
  this.router.navigate([pageLink])
}

markAsRead(){
  let sentData = {
    'NotificationId' : []
  }
  this.notificationsList.map((res)=>{
    {
      return sentData.NotificationId.push(res.id)
    }
  })

  this.notificationService.updateNotifications(sentData).subscribe(res=>{
    this.toastr.success(res.message)
    this.getNotReadable()
  },err=>{
    this.toastr.error(err.message)
  })
}

onScroll()
  {

        this.loadMore();
  }

  loadMore()
  {
    this.searchModel.page = 1
    this.searchModel.pageSize += 2
    this.getNotifications(this.searchModel)
  }

  loadMenuItems(currentSchoolId)
  {
    this.menuItems=[
      {
  
        id:1,
        enum: DashboardPanalEnums.SCHOOLS_AND_STUDENTS,
        title:this.translate.instant('sideBar.schoolsAndStudents.title'),
        claims:[ClaimsEnum.S_Menu_SchoolsAndStudents],
        links:[
          {name: this.translate.instant('sideBar.schoolsAndStudents.chidren.schools'),url:'/dashboard/schools-and-students/schools', claims:[ClaimsEnum.S_MenuItem_SchoolMenu]},
          {name: this.translate.instant('sideBar.schoolsAndStudents.chidren.students'), url:'/dashboard/schools-and-students/students', claims:[ClaimsEnum.S_MenuItem_StudentMenu]},
          {name:this.translate.instant('sideBar.schoolsAndStudents.chidren.parents'),url:'/dashboard/schools-and-students/all-parents', claims:[ClaimsEnum.S_MenuItem_GuardianMenu]},
        ]
      },
      {
        id:2,
        enum: DashboardPanalEnums.PEFORMANCE_MANAGMENT,
        title:this.translate.instant('breadcrumb.performanceMangement'),
          claims:[ClaimsEnum.S_Menu_PeformanceManagment],
        links:[
          {name: this.translate.instant('sideBar.performanceManagment.chidren.exams'),url:'/dashboard/performance-managment/assignments/assignments-list', claims:[ClaimsEnum.S_MenuItem_Exam],},
          {name: this.translate.instant('dashboard.Requests.RequestList'),url:'/dashboard/performance-managment/RequestList/Request-List', claims:[ClaimsEnum.S_MenuItem_Request],},
  
        ]
      },
      {
        id:3,
        enum: DashboardPanalEnums.MANAGAR_TOOLS,
        title:this.translate.instant('sideBar.managerTools.title'),
          claims:[ClaimsEnum.S_Menu_ManagarTools],
        links:[
          {name: this.translate.instant('sideBar.managerTools.children.Users'),url:'/dashboard/manager-tools/user-information/users-list', claims:[ClaimsEnum.S_MenuItem_user],},
          {name: this.translate.instant('sideBar.managerTools.children.Job Roles'), url:'/dashboard/manager-tools/user-roles/user-roles-list', claims:[ClaimsEnum.S_MenuItem_Role],},
          {name: this.translate.instant('sideBar.managerTools.children.systemSettings'),url:'/dashboard/manager-tools/settings', claims:[ClaimsEnum.S_MenuItem_Setting],},
          {name:  this.translate.instant('sideBar.managerTools.children.System List'),url:'/dashboard/manager-tools/indexes/indexes-list', claims:[ClaimsEnum.S_MenuItem_Index],},
        ]
      },
      {
        id:4,
        enum: DashboardPanalEnums.REPORTS_MANAGEMENT,
        title:this.translate.instant('sideBar.reportsManagment.title'),
          claims:[ClaimsEnum.S_Menu_ReportsManagement],
        links:[
          {name: this.translate.instant('sideBar.reportsManagment.chidren.studentsReport'),url:'/dashboard/reports-managment/students-reports',  claims:[ClaimsEnum.S_MenuItem_StudentReport],},
          {name: this.translate.instant('sideBar.reportsManagment.chidren.gurdiansReport'), url:'/dashboard/reports-managment/',  claims:[ClaimsEnum.S_MenuItem_GuardianReport],},
          {name: this.translate.instant('sideBar.reportsManagment.chidren.attendanceReport'),url:'/dashboard/reports-managment/',  claims:[ClaimsEnum.S_MenuItem_AbsenceReport],},
          {name:this.translate.instant('sideBar.reportsManagment.chidren.schoolsReport'),url:'/dashboard/reports-managment/',  claims:[ClaimsEnum.S_MenuItem_SchoolReport],},
          {name: this.translate.instant('sideBar.reportsManagment.chidren.gradesReport'), url:'/dashboard/reports-managment/degrees-reports',  claims:[ClaimsEnum.S_MenuItem_DegreesReport],},
          {name:this.translate.instant('sideBar.reportsManagment.chidren.EmployeesReport'),url:'/dashboard/reports-managment/',  claims:[ClaimsEnum.S_MenuItem_SchoolaEmployeeReport],},
          {name:this.translate.instant('sideBar.reportsManagment.chidren.TeachersReport'),url:'/dashboard/reports-managment/',  claims:[ClaimsEnum.S_MenuItem_SchoolTeacherReport],},
          {name:this.translate.instant('sideBar.reportsManagment.chidren.subjectsReport'), url:'/dashboard/reports-managment/',  claims:[ClaimsEnum.S_MenuItem_SubjectReport],},
        ]
      },
      {
        id:5,
        enum: DashboardPanalEnums.EDUCATIONAL_SETTING,
        title:this.translate.instant('sideBar.educationalSettings.title'),
          claims:[ClaimsEnum.S_Menu_EducationalSetting],
        links:[
          {name: this.translate.instant('sideBar.educationalSettings.children.Annual Holidays'),url:'/dashboard/educational-settings/annual-holiday/annual-holiday-list',   claims:[ClaimsEnum.S_MenuItem_Holiday]},
          {name: this.translate.instant('sideBar.educationalSettings.children.School Years'), url:'/dashboard/educational-settings/school-year/school-years-list',   claims:[ClaimsEnum.S_MenuItem_SchoolYear]},
          {name: this.translate.instant('sideBar.educationalSettings.children.Subjects'),url:'/dashboard/educational-settings/subject/subjects-list',   claims:[ClaimsEnum.S_MenuItem_SubjectMenu]},
          {name: this.translate.instant('sideBar.educationalSettings.children.surveysList'), url:'/dashboard/educational-settings/surveys',   claims:[ClaimsEnum.S_MenuItem_Survey]},
          {name: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'),url:'/dashboard/educational-settings/assessments/assements-list',   claims:[ClaimsEnum.S_MenuItem_Rate]},
        ]
      },
  
      // Employee Scope 
      {
        id:6,
        enum: DashboardPanalEnums.Student_Management,
        title:this.translate.instant('dashboard.students.studentsMangement'),
        claims:[ClaimsEnum.E_menu_ManageStudents],
        links:[
          {name: this.translate.instant('sideBar.schoolsAndStudents.chidren.parents'),url:'/dashboard/student-management/all-parents', claims:[ClaimsEnum.E_MenuItem_parents]},
          {name: this.translate.instant('sideBar.schoolsAndStudents.chidren.students'),url:'/dashboard/student-management/students', claims:[ClaimsEnum.E_MenuItem_Students]},
          {name: this.translate.instant('dashboard.Requests.RequestList'), url:'/dashboard/performance-managment//RequestList', claims:[ClaimsEnum.E_MenuItem_Requests]},
        ]
      },
  
      {
        id:7,
        enum: DashboardPanalEnums.Grades_Divisions_Management,
        title:this.translate.instant('breadcrumb.GradesAndDivisionsMangement'),
        claims:[ClaimsEnum.E_Menu_ManageGradesAndDivisions],
        links:[
          {name:  this.translate.instant('dashboard.schools.schoolClasses'),url:`/dashboard/grades-and-divisions/school/${currentSchoolId}/grades`, claims:[ClaimsEnum.E_MenuItem_SchoolGrades]},
          {name: this.translate.instant('dashboard.schools.schoolTracks'),url:`/dashboard/grades-and-divisions/school/${currentSchoolId}/divisions`, claims:[ClaimsEnum.E_MenuItem_SchoolDivisions]},
        ]
      },
      {
        id:8,
        enum: DashboardPanalEnums.SchoolEmployee_Management,
        title: this.translate.instant('dashboard.schools.schoolEmployeeMangement'),
        claims:[ClaimsEnum.E_menu_ManageSchoolEmployee],
        links:[
          {name:  this.translate.instant('breadcrumb.Employees'),url:`/dashboard/schoolEmployee-management/school/${currentSchoolId}/employees`, claims:[ClaimsEnum.E_MenuItem_SchoolEmployee]},
        ]
      },
      {
        id:9,
        enum: DashboardPanalEnums.School_PerformanceManagent,
        title:this.translate.instant('breadcrumb.performanceMangement'),
        claims:[ClaimsEnum.E_menu_SchoolPerformanceManagent],
        links:[
          {name:  this.translate.instant('breadcrumb.showGrades'),url:`/dashboard/grades-and-divisions/school/${currentSchoolId}/divisions`, claims:[ClaimsEnum.E_MenuItem_Degrees]},
          {name:  this.translate.instant('breadcrumb.showAttendance'),url:`/dashboard/grades-and-divisions/school/${currentSchoolId}/divisions`, claims:[ClaimsEnum.E_MenuItem_Attendance]},
          {name: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'), url:'/dashboard/educational-settings/assessments/assements-list', claims:[ClaimsEnum.E_MenuItem_Evaluation]},
          {name: this.translate.instant('sideBar.performanceManagment.chidren.exams'),url:'/dashboard/performance-managment/assignments/assignments-list', claims:[ClaimsEnum.E_MenuItem_Exams]},
        ]
      },
      {
        id:10,
        enum: DashboardPanalEnums.School_Management,
        title:this.translate.instant('dashboard.schools.schoolMangement'),
        claims:[ClaimsEnum.E_Menu_ManageSchool],
        links:[
          {name:this.translate.instant('dashboard.schools.generalInfo'),url:`/dashboard/school-management/school/${currentSchoolId}`, claims:[ClaimsEnum.E_MenuItem_GeneralInfo]},
          {name: this.translate.instant('sideBar.educationalSettings.children.Subjects'),url:`/dashboard/school-management/school/${currentSchoolId}/subjects`, claims:[ClaimsEnum.E_MenuItem_Subjects]},
          {name: this.translate.instant('sideBar.educationalSettings.children.Annual Holidays'), url:`/dashboard/school-management/school/${currentSchoolId}/annual-holidays`, claims:[ClaimsEnum.E_MenuItem_AnnualHolidays]},
          {name:  this.translate.instant('dashboard.schools.editableList'),url:`/dashboard/school-management/school/${currentSchoolId}/edit-list`, claims:[ClaimsEnum.E_MenuItem_EditList]},
        ]
      },
  
  
  
    ]
  }
}