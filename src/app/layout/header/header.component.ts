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

  YEAR_Id=''
  currentSchoolId;
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
    
 
  this.sharedService.getInformationOfCurrentSchoolEmployee().subscribe((res)=>{
    this.currentSchoolId=res;console.log(res);
    this.loadMenuItemsData();
  })
  this.loadMenuItemsData();
    // if(this.router.url.indexOf('dashboard') > -1) this.isInDashboard = true

    // this.router.events
    // .pipe(filter( event =>event instanceof NavigationEnd))
    // .subscribe((event: NavigationEnd) => {

    //   if(event.url.indexOf('dashboard') > -1){
    //     this.isInDashboard = true
    //   }
    // })
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
    // this.translationService.handleLanguageChange()

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
    // this.activeMenuItemChanged = true

  }

  atclickOutside(){
    this.isMenuOpend = false
  }

  onDateSelected(e){
    console.log(e);

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

    // if(this.notificationsList.length)
    // {
    //     this.showSpinner=false;
    // }
    // else
    // { this.showSpinner=true;}
        this.loadMore();
  }

  loadMore()
  {
    this.searchModel.page = 1
    this.searchModel.pageSize += 2
    this.getNotifications(this.searchModel)
  }
  loadMenuItemsData()
  {
   this.menuItems= [
      {
  
        id:1,
        enum: DashboardPanalEnums.SCHOOLS_AND_STUDENTS,
        title:'مدارس وطلاب',
        claims:[],
        links:[
          {name: 'مدرستى',url:'/dashboard/schools-and-students/schools/school/'+this.currentSchoolId},
          {name: 'المدارس',url:'/dashboard/schools-and-students/schools', claims:[ClaimsEnum.S_MenuItem_SchoolMenu]},
          {name: 'الطلاب', url:'/dashboard/schools-and-students/students', claims:[ClaimsEnum.S_MenuItem_StudentMenu]},
          {name: 'اولياء الامور',url:'/dashboard/schools-and-students/all-parents', claims:[ClaimsEnum.S_MenuItem_GuardianMenu]},
        ]
      },
      {
        id:2,
        enum: DashboardPanalEnums.PEFORMANCE_MANAGMENT,
        title:'اداره الاداء',
          claims:[ClaimsEnum.S_Menu_PeformanceManagment],
        links:[
          {name: 'الامتحانات',url:'/dashboard/performance-managment/assignments/assignments-list', claims:[ClaimsEnum.S_MenuItem_Exam],},
          {name: 'قائمه الطلبات',url:'/dashboard/performance-managment/RequestList/Request-List', claims:[ClaimsEnum.S_MenuItem_Request],},
  
        ]
      },
      {
        id:3,
        enum: DashboardPanalEnums.MANAGAR_TOOLS,
        title:'ادوات مدير النظام',
          claims:[ClaimsEnum.S_Menu_ManagarTools],
        links:[
          {name: 'المستخدمين',url:'/dashboard/manager-tools/user-information/users-list', claims:[ClaimsEnum.S_MenuItem_user],},
          {name: 'الادوار الوظيفيه', url:'/dashboard/manager-tools/user-roles/user-roles-list', claims:[ClaimsEnum.S_MenuItem_Role],},
          {name: 'اعدادات النظام ',url:'/dashboard/manager-tools/settings', claims:[],},
          {name: 'قواءم النظام',url:'/dashboard/manager-tools/indexes/indexes-list', claims:[ClaimsEnum.S_MenuItem_Index],},
        ]
      },
      {
        id:4,
        enum: DashboardPanalEnums.REPORTS_MANAGEMENT,
        title:'اداره التقارير',
          claims:[ClaimsEnum.S_Menu_ReportsManagement],
        links:[
          {name: 'تقرير الطلاب',url:'/dashboard/reports-managment/students-reports',  claims:[ClaimsEnum.S_MenuItem_StudentReport],},
          {name: 'تقرير اولياء الامور', url:'/dashboard/reports-managment/',  claims:[ClaimsEnum.S_MenuItem_GuardianReport],},
          {name: 'تقرير الغياب والحضور',url:'/dashboard/reports-managment/',  claims:[ClaimsEnum.S_MenuItem_AbsenceReport],},
          {name: 'تقرير المدارس',url:'/dashboard/reports-managment/',  claims:[ClaimsEnum.S_MenuItem_SchoolReport],},
          {name: 'تقرير الدرجات', url:'/dashboard/reports-managment/degrees-reports',  claims:[ClaimsEnum.S_MenuItem_DegreesReport],},
          {name: 'تقرير الموظفين',url:'/dashboard/reports-managment/',  claims:[ClaimsEnum.S_MenuItem_SchoolaEmployeeReport],},
          {name: 'تقرير المعلمين',url:'/dashboard/reports-managment/',  claims:[ClaimsEnum.S_MenuItem_SchoolTeacherReport],},
          {name: 'تقرير المواد الدراسيه', url:'/dashboard/reports-managment/',  claims:[ClaimsEnum.S_MenuItem_SubjectReport],},
        ]
      },
      {
        id:5,
        enum: DashboardPanalEnums.EDUCATIONAL_SETTING,
        title:'الاعدادات التعليميه',
          claims:[ClaimsEnum.S_Menu_EducationalSetting],
        links:[
          {name: 'الاجازه السنويه',url:'/dashboard/educational-settings/annual-holiday/annual-holiday-list',   claims:[ClaimsEnum.S_MenuItem_Holiday]},
          {name: 'السنوات الدراسيه', url:'/dashboard/educational-settings/school-year/school-years-list',   claims:[ClaimsEnum.S_MenuItem_SchoolYear]},
          {name: 'المواد الدراسيه',url:'/dashboard/educational-settings/subject/subjects-list',   claims:[ClaimsEnum.S_MenuItem_SubjectMenu]},
          {name: 'قائمه الاستبيانات', url:'/dashboard/educational-settings/surveys',   claims:[ClaimsEnum.S_MenuItem_Survey]},
          {name: 'تقيمات المواد الدراسيه',url:'/dashboard/educational-settings/assessments/assements-list',   claims:[ClaimsEnum.S_MenuItem_Rate]},
        ]
      },
    ]
  }
}
