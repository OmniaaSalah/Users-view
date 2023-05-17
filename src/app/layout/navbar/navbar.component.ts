
import { ChangeDetectionStrategy, Component, inject, NgZone, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { faAngleDown, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import {  distinctUntilChanged, fromEvent } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { NotificationService } from 'src/app/modules/notifications/service/notification.service';
import { slide } from 'src/app/shared/animation/animation';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { RouteListenrService } from 'src/app/shared/services/route-listenr/route-listenr.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'src/app/modules/messages/service/message.service';
import { MessageStatus } from 'src/app/shared/enums/status/status.enum';
interface MenuItem{
  id:number
  title:string
  claims:ClaimsEnum[],
  enum: RouteEnums,
  links:{}[]
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations:[slide]
})
export class NavbarComponent implements OnInit {
  lang = inject(TranslationService).lang
  guardianName;
  schoolYearsList=[];
  schoolYearId= this.userService.schoolYearId || ''
  notificationNumber;
  currentUserScope = inject(UserService).getCurrentUserScope();
  get ScopeEnum(){return UserScope}
  get claimsEnum() {return ClaimsEnum}
  currentSchoolId

   guardianNavItems = [
    {name:this.translate.instant('Home Page'),Link:"/"},
    {name:this.translate.instant('My requests'),Link:"/requests-list"}
    //,{name:this.translate.instant('about daleel'),Link:"/about-us"}
  ]


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
    "sortBy": 'update',
    "page": 1,
    "pageSize": null,
    "isRead": null,
    "senderIds":null,
    "arabicNotificationName":null,
    "englishNotificationName":null
  }

  constructor(
    private toastr:ToastrService,
    private router: Router,
    private translate:TranslateService,
    private userService: UserService,
    public routeListenrService:RouteListenrService,
    private zone: NgZone,
    private notificationService: NotificationService,
    private sharedService:SharedService,
    private authService:AuthenticationService,
    private translation:TranslationService,
    private messageService: MessageService,
    ) { }


  ngOnInit(): void {


    this.userService.isUserLogged$.pipe(distinctUntilChanged()).subscribe((res)=>{
       if(res){
          this.guardianName=this.userService.getCurrentUserName();
          this.getSchoolYearsList();
          // this.userService.currentUserName.subscribe((res)=>{this.guardianName=res;})
          this.getCurrentUserMessages()
          this.getNotficationNumber()

          this.notificationService.unReadNotificationNumber.subscribe((response) => {
          if(response!=0)
          {this.notificationNumber = response;}
          else
          {this.notificationNumber = '';}
          });
      }

      });

    this.userService.currentUserSchoolId$.subscribe(id => {this.loadMenuItems(id)});

    if(localStorage.getItem('preferredLanguage')=='ar'){
      this.checkLanguage = true
    }else{
      this.checkLanguage = false
    }
    this.setupScrollListener()
  }

  getSchoolYearsList(){
   this.sharedService.getSchoolYearsList().subscribe((res)=>{ this.schoolYearsList = res })
  }

  getNotifications(searchModel){
    if(this.searchModel.pageSize==null)
    {this.searchModel.pageSize=2;}
    this.notificationService.getAllNotifications(searchModel).subscribe(res=> this.notificationsList = res.data)
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

  changeStatus(value){
    if(value=='0'){
      this.isChecked= false
      this.getNotifications(this.searchModel = {
        "keyword": null,
        "sortBy": null,
        "page": 1,
        "pageSize": 2,
        "isRead": null,
        "senderIds":null,
        "arabicNotificationName":null,
        "englishNotificationName":null
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
goToNotificationDetails(pageLink,id,isRead){

  if(pageLink) window.open(pageLink, '_blank')
  if(!isRead)
  {
    this.notificationService.unReadNotificationNumber.subscribe((response) => { this.notificationNumber=response-1});
    this.notificationService.updateNotifications({'NotificationId' : [id]}).subscribe(res=>{
    },err=>{
      this.toastr.error(this.translate.instant('Request cannot be processed, Please contact support.'))
    })
  }

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
    // this.toastr.success(res.message)
    this.getNotficationNumber();
    this.getNotReadable();

  },err=>{
    this.toastr.error(this.translate.instant('Request cannot be processed, Please contact support.'))
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
        enum: RouteEnums.SCHOOLS_AND_STUDENTS,
        title:this.translate.instant('sideBar.schoolsAndStudents.title'),
        claims:[ClaimsEnum.S_Menu_SchoolsAndStudents],
        links:[
          {name: this.translate.instant('sideBar.schoolsAndStudents.chidren.schools'),url:'/schools-and-students/schools', claims:[ClaimsEnum.S_MenuItem_SchoolMenu]},
          {name: this.translate.instant('sideBar.schoolsAndStudents.chidren.students'), url:'/schools-and-students/students', claims:[ClaimsEnum.S_MenuItem_StudentMenu]},
          {name:this.translate.instant('sideBar.schoolsAndStudents.chidren.parents'),url:'/schools-and-students/all-parents', claims:[ClaimsEnum.S_MenuItem_GuardianMenu]},
        ]
      },

      // Appear for school Employee
      {
        id:6,
        enum: RouteEnums.Student_Management,
        title:this.translate.instant('dashboard.students.studentsMangement'),
        claims:[ClaimsEnum.E_menu_ManageStudents],
        links:[
          {name: this.translate.instant('sideBar.schoolsAndStudents.chidren.parents'),url:'/student-management/all-parents', claims:[ClaimsEnum.E_MenuItem_parents]},
          {name: this.translate.instant('sideBar.schoolsAndStudents.chidren.students'),url:'/student-management/students', claims:[ClaimsEnum.E_MenuItem_Students]},

        ]
      },

      {
        id:2,
        enum: RouteEnums.PEFORMANCE_MANAGMENT,
        title:this.translate.instant('breadcrumb.performanceMangement'),
        claims:[ClaimsEnum.S_Menu_PeformanceManagment,ClaimsEnum.E_menu_SchoolPerformanceManagent],
        links:[
          {
            name: this.translate.instant('sideBar.performanceManagment.chidren.exams'),
            url: this.currentUserScope == this.ScopeEnum.SPEA ? '/performance-managment/assignments/assignments-list' : '/school-performance-managent/assignments/assignments-list',
            claims:[ClaimsEnum.SE_MenuItem_Exam],},
          {
            name: this.translate.instant('dashboard.Requests.RequestList'),
            url:'/performance-managment/RequestList/',
            isHidden: this.currentUserScope == this.ScopeEnum.SPEA ? false : true,
            claims:[ClaimsEnum.S_MenuItem_Request]
          },
          {
            name: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'),
            url:'/performance-managment/assessments/assements-list',
            isHidden: this.currentUserScope == this.ScopeEnum.SPEA ? false : true,
            claims:[ClaimsEnum.SE_MenuItem_Rate]
          },

          // For schools
          {
            name: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'),
            url:'/school-performance-managent/assessments/assements-list',
            isHidden: this.currentUserScope == this.ScopeEnum.Employee ? false : true,
            claims:[ClaimsEnum.SE_MenuItem_Rate]
          },
          // {name: this.translate.instant('sideBar.performanceManagment.chidren.exams'),url:'/school-performance-managent/assignments/assignments-list', claims:[ClaimsEnum.SE_MenuItem_Exam]},

        ]
      },
      {
        id:3,
        enum: RouteEnums.MANAGAR_TOOLS,
        title:this.translate.instant('sideBar.managerTools.title'),
          claims:[ClaimsEnum.S_Menu_ManagarTools],
        links:[
          {name: this.translate.instant('sideBar.managerTools.children.Users'),url:'/manager-tools/user-information/users-list', claims:[ClaimsEnum.S_MenuItem_user],},
          {name: this.translate.instant('sideBar.managerTools.children.Job Roles'), url:'/manager-tools/user-roles/user-roles-list', claims:[ClaimsEnum.S_MenuItem_Role],},
          {name: this.translate.instant('sideBar.managerTools.children.systemSettings'),url:'/manager-tools/settings', claims:[ClaimsEnum.S_MenuItem_Setting],},
          {name:  this.translate.instant('sideBar.managerTools.children.System List'),url:'/manager-tools/indexes/indexes-list', claims:[ClaimsEnum.S_MenuItem_Index],},
          {name: this.translate.instant('breadcrumb.NotificationsSettings'),url:'/manager-tools/notifications/', claims:[ClaimsEnum.S_MenuItem_Setting],},

        ]
      },


      {
        id:4,
        enum: RouteEnums.REPORTS_MANAGEMENT,
        title:this.translate.instant('sideBar.reportsManagment.title'),
          claims:[ClaimsEnum.S_Menu_ReportsManagement],
        links:[
          {name: this.translate.instant('sideBar.reportsManagment.chidren.studentsReport'),url:'/reports-managment/students-reports',  claims:[ClaimsEnum.S_MenuItem_StudentReport],},
          {name: this.translate.instant('sideBar.reportsManagment.chidren.gurdiansReport'), url:'/reports-managment/parents-reports',  claims:[ClaimsEnum.S_MenuItem_GuardianReport],},
          {name: this.translate.instant('sideBar.reportsManagment.chidren.attendanceReport'),url:'/reports-managment/attendance-reports',  claims:[ClaimsEnum.S_MenuItem_AbsenceReport],},
          {name:this.translate.instant('sideBar.reportsManagment.chidren.schoolsReport'),url:'/reports-managment/schools-reports',  claims:[ClaimsEnum.S_MenuItem_SchoolReport],},
          {name: this.translate.instant('sideBar.reportsManagment.chidren.gradesReport'), url:'/reports-managment/degrees-reports',  claims:[ClaimsEnum.S_MenuItem_DegreesReport],},
          {name:this.translate.instant('sideBar.reportsManagment.chidren.EmployeesReport'),url:'/reports-managment/users-reports',  claims:[ClaimsEnum.S_MenuItem_SchoolEmployeeReport],},
          {name:this.translate.instant('sideBar.reportsManagment.chidren.TeachersReport'),url:'/reports-managment/teachers-reports',  claims:[ClaimsEnum.S_MenuItem_SchoolTeacherReport],},
          {name:this.translate.instant('sideBar.reportsManagment.chidren.subjectsReport'), url:'/reports-managment/subjects-reports',  claims:[ClaimsEnum.S_MenuItem_SubjectReport],},
          {name:this.translate.instant('sideBar.reportsManagment.chidren.TransferedStudentsReport'), url:'/reports-managment/transfered-students-reports',claims:[ClaimsEnum.S_MenuItem_TransferedStudentsReport]}
        ]
      },
      {
        id:5,
        enum: RouteEnums.EDUCATIONAL_SETTING,
        title:this.translate.instant('sideBar.educationalSettings.title'),
          claims:[ClaimsEnum.S_Menu_EducationalSetting],
        links:[
          {name: this.translate.instant('sideBar.educationalSettings.children.Annual Holidays'),url:'/educational-settings/annual-holiday/annual-holiday-list',   claims:[ClaimsEnum.S_MenuItem_Holiday]},
          {name: this.translate.instant('sideBar.educationalSettings.children.School Years'), url:'/educational-settings/school-year/school-years-list',   claims:[ClaimsEnum.S_MenuItem_SchoolYear]},
          {name: this.translate.instant('sideBar.educationalSettings.children.Subjects'),url:'/educational-settings/subject/subjects-list',   claims:[ClaimsEnum.S_MenuItem_SubjectMenu]},
          {name: this.translate.instant('sideBar.educationalSettings.children.surveysList'), url:'/educational-settings/surveys',   claims:[ClaimsEnum.S_MenuItem_Survey]},
          // {name: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'),url:'/educational-settings/assessments/assements-list',   claims:[ClaimsEnum.SE_MenuItem_Rate]},
        ]
      },

      // Employee Scope


      {
        id:7,
        enum: RouteEnums.Grades_Divisions_Management,
        title:this.translate.instant('breadcrumb.GradesAndDivisionsMangement'),
        claims:[ClaimsEnum.E_Menu_ManageGradesAndDivisions],
        links:[
          {name:  this.translate.instant('dashboard.schools.schoolClasses'),url:`/grades-and-divisions/school/${currentSchoolId}/grades`, claims:[ClaimsEnum.E_MenuItem_SchoolGrades]},
          {name: this.translate.instant('dashboard.schools.schoolTracks'),url:`/grades-and-divisions/school/${currentSchoolId}/divisions`, claims:[ClaimsEnum.E_MenuItem_SchoolDivisions]},
        ]
      },
      {
        id:8,
        enum: RouteEnums.SchoolEmployee_Management,
        title: this.translate.instant('dashboard.schools.schoolEmployeeMangement'),
        claims:[ClaimsEnum.E_menu_ManageSchoolEmployee],
        links:[
          {name:  this.translate.instant('breadcrumb.Employees'),url:`/schoolEmployee-management/school/${currentSchoolId}/employees`, claims:[ClaimsEnum.E_MenuItem_SchoolEmployee]},
        ]
      },
      // {
      //   id:9,
      //   enum: RouteEnums.School_PerformanceManagent,
      //   title:this.translate.instant('breadcrumb.performanceMangement'),
      //   claims:[ClaimsEnum.E_menu_SchoolPerformanceManagent],
      //   links:[
      //     {name: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'), url:'/school-performance-managent/assessments/assements-list', claims:[ClaimsEnum.SE_MenuItem_Rate]},
      //     {name: this.translate.instant('sideBar.performanceManagment.chidren.exams'),url:'/school-performance-managent/assignments/assignments-list', claims:[ClaimsEnum.SE_MenuItem_Exam]},
      //   ]
      // },
      {
        id:10,
        enum: RouteEnums.School_Management,
        title:this.translate.instant('dashboard.schools.schoolMangement'),
        claims:[ClaimsEnum.E_Menu_ManageSchool],
        links:[
          {name:this.translate.instant('dashboard.schools.generalInfo'),url:`/school-management/school/${currentSchoolId}`, claims:[ClaimsEnum.E_MenuItem_GeneralInfo]},
          {name: this.translate.instant('sideBar.educationalSettings.children.Subjects'),url:`/school-management/school/${currentSchoolId}/subjects`, claims:[ClaimsEnum.E_MenuItem_Subjects]},
          {name: this.translate.instant('sideBar.educationalSettings.children.Annual Holidays'), url:`/school-management/school/${currentSchoolId}/annual-holidays`, claims:[ClaimsEnum.E_MenuItem_AnnualHolidays]},
          {name:  this.translate.instant('dashboard.schools.editableList'),url:`/school-management/school/${currentSchoolId}/edit-list`, claims:[ClaimsEnum.SE_MenuItem_EditList]},
          {name: this.translate.instant('dashboard.Requests.myRequests'),url:'/school-management/requests-list/my-requests', queryParams:{isMyRequests:true}, claims:[ClaimsEnum.E_MenuItem_Requests]},
          {name: this.translate.instant('dashboard.Requests.requestsToMe'),url:'/school-management/requests-list', claims:[ClaimsEnum.E_MenuItem_Requests]},

        ]
      },



    ]
  }


  onYearSelected(schoolYearId){
    this.userService.persist('yearId',schoolYearId);
    window.location.reload();
  }

  logout(){
    this.authService.logOut();
  }



  getNotficationNumber(){

    this.searchModel.pageSize=8;
    this.searchModel.isRead=null;

    this.notificationService.getAllNotifications().subscribe((res)=>{
      let unReadCount=0;
      this.notificationService.notificationNumber.next(res.total);
      res.data.forEach(element => {
        if(!element.isRead)
        {unReadCount++;}
      });
      this.notificationService.unReadNotificationNumber.next(unReadCount)
    })
  }

  unReadedMessagesCount=0

  getCurrentUserMessages(){
    let userId = this.userService.getCurrentUserId();
    this.messageService.getCurrentUserMessages(userId, this.currentUserScope,{PageSize:50, Page:1})
    .subscribe(res=>{
      this.unReadedMessagesCount=res?.countPending;
    })
  }

  transform(value: Date | string, format = "d MMMM y "): string {

    const datePipe = new DatePipe(this.translation.lang ||  'ar');
    return datePipe.transform(value, format);
  }

  changeLanguage(): void {
    this.translation.handleLanguageChange();
  }

}
