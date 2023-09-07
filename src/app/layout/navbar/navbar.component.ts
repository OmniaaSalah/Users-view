import {Component,inject,NgZone, OnInit,} from '@angular/core';
import { faAngleDown, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged, fromEvent, Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { slide } from 'src/app/shared/animation/animation';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { RouteListenrService } from 'src/app/shared/services/route-listenr/route-listenr.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { MessageService } from 'src/app/modules/messages/service/message.service';
import { SchoolsService } from 'src/app/modules/schools/services/schools/schools.service';
import { SchoolYearsService } from 'src/app/modules/school-years/service/school-years.service';
interface MenuItem {
  id: number;
  title: string | Observable<any>;
  claims: ClaimsEnum[];
  enum: RouteEnums;
  links: {}[];
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slide],
})
export class NavbarComponent implements OnInit {
  lang = inject(TranslationService).lang;
  guardianName;
  schoolYearId = this.userService.schoolYearId || '';
  schoolYearsList = [];

  currentUserScope = inject(UserService).getScope();
  get ScopeEnum() {
    return UserScope;
  }
  get claimsEnum() {
    return ClaimsEnum;
  }
  currentSchoolId;

  guardianNavItems = [
    { name: this.translate.get('Home Page'), Link: '/' },
    { name: this.translate.get('My requests'), Link: '/requests-list' },
  ];

  message: string = '';
  faAngleDown = faAngleDown;
  faArrowLeft = faArrowLeft;

  classes = {
    // 'on-scroll': false
  };

  activeRoute$ = this.routeListenrService.activeRoute$;

  isMenuOpend = false;
  activeMenuItem: MenuItem;
  activeMenuItemChanged = false;

  menuItems: MenuItem[];



  constructor(
    private translate: TranslateService,
    private userService: UserService,
    public routeListenrService: RouteListenrService,
    private zone: NgZone,
    private sharedService: SharedService,
    private authService: AuthenticationService,
    private translation: TranslationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getCurrentUserMessages();
    this.userService.isUserLogged$
      .pipe(distinctUntilChanged())
      .subscribe((res) => {
        if (res) {
          this.guardianName = this.userService.getCurrentUserName();
          this.getSchoolYearsList();
          // this.userService.currentUserName.subscribe((res)=>{this.guardianName=res;})

        }
      });

    this.userService.currentUserSchoolId$.subscribe((id) => {
      this.loadMenuItems(id);
    });


    this.setupScrollListener();
  }

  getSchoolYearsList() {
    this.sharedService.getSchoolYearsList().subscribe((res) => {
      this.schoolYearsList = res;
    });
  }



  private setupScrollListener() {
    this.zone.runOutsideAngular(() => {
      fromEvent(window, 'scroll').subscribe((e: any) => {
        if (e.target.scrollingElement.scrollTop <= 1) {
          this.zone.run(() => (this.classes['on-scroll'] = false));
        } else if (
          e.target.scrollingElement.scrollTop > 1 &&
          e.target.scrollingElement.scrollTop < 7
        ) {
          this.zone.run(() => (this.classes['on-scroll'] = true));
        }
      });
    });
  }

  openMenu(id) {

    if (this.activeMenuItem && this.activeMenuItem?.id == id) {
      this.isMenuOpend = !this.isMenuOpend;
      this.activeMenuItemChanged = true;
    } else {
      this.activeMenuItemChanged = false;
      this.activeMenuItem = {...this.menuItems.find(el=> el.id === id)};
      this.isMenuOpend = true;

      setTimeout(() => {
        this.activeMenuItemChanged = true;
      }, 320);
    }
    this.activeMenuItem = {...this.menuItems.find(el=> el.id === id)};
  }



  loadMenuItems(currentSchoolId) {
    this.menuItems = [
      {
        id: 1,
        enum: RouteEnums.SCHOOLS_AND_STUDENTS,
        title: this.translate.get('sideBar.schoolsAndStudents.title'),
        claims: [ClaimsEnum.S_Menu_SchoolsAndStudents],
        links: [
          {
            name: this.translate.get(
              'sideBar.schoolsAndStudents.chidren.schools'
            ),
            url: '/schools-and-students/schools',
            claims: [ClaimsEnum.S_MenuItem_SchoolMenu],
          },
          {
            name: this.translate.get(
              'sideBar.schoolsAndStudents.chidren.students'
            ),
            url: '/schools-and-students/students',
            claims: [ClaimsEnum.S_MenuItem_StudentMenu],
          },
          {
            name: this.translate.get(
              'sideBar.schoolsAndStudents.chidren.parents'
            ),
            url: '/schools-and-students/all-parents',
            claims: [ClaimsEnum.S_MenuItem_GuardianMenu],
          },
        ],
      },

      // Appear for school Employee
      {
        id: 2,
        enum: RouteEnums.Student_Management,
        title: this.translate.get('dashboard.students.studentsMangement'),
        claims: [ClaimsEnum.E_menu_ManageStudents],
        links: [
          {
            name: this.translate.get(
              'sideBar.schoolsAndStudents.chidren.parents'
            ),
            url: '/student-management/all-parents',
            claims: [ClaimsEnum.E_MenuItem_parents],
          },
          {
            name: this.translate.get(
              'sideBar.schoolsAndStudents.chidren.students'
            ),
            url: '/student-management/students',
            claims: [ClaimsEnum.E_MenuItem_Students],
          },
        ],
      },

      {
        id: 3,
        enum: RouteEnums.PEFORMANCE_MANAGMENT,
        title: this.translate.get('breadcrumb.performanceMangement'),
        claims: [
          ClaimsEnum.S_Menu_PeformanceManagment,
          ClaimsEnum.E_menu_SchoolPerformanceManagent,
        ],
        links: [
          {
            name: this.translate.get(
              'sideBar.performanceManagment.chidren.exams'
            ),
            url:
              this.currentUserScope == this.ScopeEnum.SPEA
                ? '/performance-managment/assignments/assignments-list'
                : '/school-performance-managent/assignments/assignments-list',
            claims: [ClaimsEnum.SE_MenuItem_Exam],
          },
          {
            name: this.translate.get('dashboard.Requests.RequestList'),
            url: '/performance-managment/RequestList/',
            isHidden:
              this.currentUserScope == this.ScopeEnum.SPEA ? false : true,
            claims: [ClaimsEnum.S_MenuItem_Request],
          },
          {
            name: this.translate.get(
              'sideBar.educationalSettings.children.Subjects Assessments'
            ),
            url: '/performance-managment/assessments/assements-list',
            isHidden:
              this.currentUserScope == this.ScopeEnum.SPEA ? false : true,
            claims: [ClaimsEnum.SE_MenuItem_Rate],
          },

          // For schools
          {
            name: this.translate.get(
              'sideBar.educationalSettings.children.Subjects Assessments'
            ),
            url: '/school-performance-managent/assessments/assements-list',
            isHidden:
              this.currentUserScope == this.ScopeEnum.Employee ? false : true,
            claims: [ClaimsEnum.SE_MenuItem_Rate],
          },
          // {name: this.translate.get('sideBar.performanceManagment.chidren.exams'),url:'/school-performance-managent/assignments/assignments-list', claims:[ClaimsEnum.SE_MenuItem_Exam]},
        ],
      },
      {
        id: 4,
        enum: RouteEnums.MANAGAR_TOOLS,
        title: this.translate.get('sideBar.managerTools.title'),
        claims: [ClaimsEnum.S_Menu_ManagarTools],
        links: [
          {
            name: this.translate.get('sideBar.managerTools.children.Users'),
            url: '/manager-tools/user-information/users-list',
            claims: [ClaimsEnum.S_MenuItem_user],
          },
          {
            name: this.translate.get('sideBar.managerTools.children.Job Roles'),
            url: '/manager-tools/user-roles/user-roles-list',
            claims: [ClaimsEnum.S_MenuItem_Role],
          },
          {
            name: this.translate.get(
              'sideBar.managerTools.children.systemSettings'
            ),
            url: '/manager-tools/settings',
            claims: [ClaimsEnum.S_MenuItem_Setting],
          },
          {
            name: this.translate.get(
              'sideBar.managerTools.children.System List'
            ),
            url: '/manager-tools/indexes',
            claims: [ClaimsEnum.S_MenuItem_Index],
          },
          {
            name: this.translate.get('breadcrumb.NotificationsSettings'),
            url: '/manager-tools/notifications/',
            claims: [ClaimsEnum.S_MenuItem_Setting],
          },
        ],
      },

      {
        id: 5,
        enum: RouteEnums.REPORTS_MANAGEMENT,
        title:this.translate.get('sideBar.reportsManagment.title'),
          claims:[ClaimsEnum.S_Menu_ReportsManagement],
        links:[
          {name: this.translate.get('sideBar.reportsManagment.chidren.studentsReport'),url:'/reports-managment/students-reports',  claims:[ClaimsEnum.S_MenuItem_StudentReport],},
          {name: this.translate.get('sideBar.reportsManagment.chidren.gurdiansReport'), url:'/reports-managment/parents-reports',  claims:[ClaimsEnum.S_MenuItem_GuardianReport],},
          {name: this.translate.get('sideBar.reportsManagment.chidren.attendanceReport'),url:'/reports-managment/attendance-reports',  claims:[ClaimsEnum.S_MenuItem_AbsenceReport],},
          {name:this.translate.get('sideBar.reportsManagment.chidren.schoolsReport'),url:'/reports-managment/schools-reports',  claims:[ClaimsEnum.S_MenuItem_SchoolReport],},
          {name: this.translate.get('sideBar.reportsManagment.chidren.gradesReport'), url:'/reports-managment/degrees-reports',  claims:[ClaimsEnum.S_MenuItem_DegreesReport],},
          {name:this.translate.get('sideBar.reportsManagment.chidren.EmployeesReport'),url:'/reports-managment/users-reports',  claims:[ClaimsEnum.S_MenuItem_SchoolEmployeeReport],},
          {name:this.translate.get('sideBar.reportsManagment.chidren.TeachersReport'),url:'/reports-managment/teachers-reports',  claims:[ClaimsEnum.S_MenuItem_SchoolTeacherReport],},
          {name:this.translate.get('sideBar.reportsManagment.chidren.subjectsReport'), url:'/reports-managment/subjects-reports',  claims:[ClaimsEnum.S_MenuItem_SubjectReport],},
          {name:this.translate.get('sideBar.reportsManagment.chidren.TransferedStudentsReport'), url:'/reports-managment/transfered-students-reports',claims:[ClaimsEnum.S_MenuItem_TransferedStudentsReport]}
        ]
      },
      {
        id: 6,
        enum: RouteEnums.EDUCATIONAL_SETTING,
        title: this.translate.get('sideBar.educationalSettings.title'),
        claims: [ClaimsEnum.S_Menu_EducationalSetting],
        links: [
          {
            name: this.translate.get(
              'sideBar.educationalSettings.children.Annual Holidays'
            ),
            url: '/educational-settings/annual-holiday/annual-holiday-list',
            claims: [ClaimsEnum.S_MenuItem_Holiday],
          },
          {
            name: this.translate.get(
              'sideBar.educationalSettings.children.School Years'
            ),
            url: '/educational-settings/school-year/school-years-list',
            claims: [ClaimsEnum.S_MenuItem_SchoolYear],
          },
          {
            name: this.translate.get(
              'sideBar.educationalSettings.children.Subjects'
            ),
            url: '/educational-settings/subject/subjects-list',
            claims: [ClaimsEnum.S_MenuItem_SubjectMenu],
          },
          {
            name: this.translate.get(
              'sideBar.educationalSettings.children.surveysList'
            ),
            url: '/educational-settings/surveys',
            claims: [ClaimsEnum.S_MenuItem_Survey],
          },
          // {name: this.translate.get('sideBar.educationalSettings.children.Subjects Assessments'),url:'/educational-settings/assessments/assements-list',   claims:[ClaimsEnum.SE_MenuItem_Rate]},
        ],
      },

      // Employee Scope

      {
        id: 7,
        enum: RouteEnums.Grades_Divisions_Management,
        title: this.translate.get('breadcrumb.GradesAndDivisionsMangement'),
        claims: [ClaimsEnum.E_Menu_ManageGradesAndDivisions],
        links: [
          {
            name: this.translate.get('dashboard.schools.schoolClasses'),
            url: `/grades-and-divisions/school/${currentSchoolId}/grades`,
            claims: [ClaimsEnum.E_MenuItem_SchoolGrades],
          },
          {
            name: this.translate.get('dashboard.schools.schoolTracks'),
            url: `/grades-and-divisions/school/${currentSchoolId}/divisions`,
            claims: [ClaimsEnum.E_MenuItem_SchoolDivisions],
          },
        ],
      },
      {
        id: 8,
        enum: RouteEnums.SchoolEmployee_Management,
        title: this.translate.get('dashboard.schools.schoolEmployeeMangement'),
        claims: [ClaimsEnum.E_menu_ManageSchoolEmployee],
        links: [
          {
            name: this.translate.get('breadcrumb.Employees'),
            url: `/schoolEmployee-management/school/${currentSchoolId}/employees`,
            claims: [ClaimsEnum.E_MenuItem_SchoolEmployee],
          },
        ],
      },
      // {
      //   id:9,
      //   enum: RouteEnums.School_PerformanceManagent,
      //   title:this.translate.get('breadcrumb.performanceMangement'),
      //   claims:[ClaimsEnum.E_menu_SchoolPerformanceManagent],
      //   links:[
      //     {name: this.translate.get('sideBar.educationalSettings.children.Subjects Assessments'), url:'/school-performance-managent/assessments/assements-list', claims:[ClaimsEnum.SE_MenuItem_Rate]},
      //     {name: this.translate.get('sideBar.performanceManagment.chidren.exams'),url:'/school-performance-managent/assignments/assignments-list', claims:[ClaimsEnum.SE_MenuItem_Exam]},
      //   ]
      // },
      {
        id: 9,
        enum: RouteEnums.School_Management,
        title: this.translate.get('dashboard.schools.schoolMangement'),
        claims: [ClaimsEnum.E_Menu_ManageSchool],
        links: [
          {
            name: this.translate.get('dashboard.schools.generalInfo'),
            url: `/school-management/school/${currentSchoolId}`,
            claims: [ClaimsEnum.E_MenuItem_GeneralInfo],
          },
          {
            name: this.translate.get(
              'sideBar.educationalSettings.children.Subjects'
            ),
            url: `/school-management/school/${currentSchoolId}/subjects`,
            claims: [ClaimsEnum.E_MenuItem_Subjects],
          },
          {
            name: this.translate.get(
              'sideBar.educationalSettings.children.Annual Holidays'
            ),
            url: `/school-management/school/${currentSchoolId}/annual-holidays`,
            claims: [ClaimsEnum.E_MenuItem_AnnualHolidays],
          },
          {
            name: this.translate.get('dashboard.schools.editableList'),
            url: `/school-management/school/${currentSchoolId}/edit-list`,
            claims: [ClaimsEnum.SE_MenuItem_EditList],
          },
          {
            name: this.translate.get('dashboard.Requests.myRequests'),
            url: '/school-management/requests-list/my-requests',
            queryParams: { isMyRequests: true },
            claims: [ClaimsEnum.E_MenuItem_Requests],
          },
          {
            name: this.translate.get('dashboard.Requests.requestsToMe'),
            url: '/school-management/requests-list',
            claims: [ClaimsEnum.E_MenuItem_Requests],
          },
        ],
      },
    ];
  }


  atclickOutside() {
    this.isMenuOpend = false;
  }





  onYearSelected(schoolYearId) {
    this.userService.persist('yearId', schoolYearId);
    window.location.reload();
  }

  logout() {
    this.authService.logOut();
  }



  unReadedMessagesCount = 0;

  getCurrentUserMessages() {
    let userId = this.userService.getCurrentUserId();
    if(this.userService.isUserLogged())
     {
      this.messageService
        .getCurrentUserMessages(userId, this.currentUserScope, {
          PageSize: 50,
          Page: 1,
        })
        .subscribe((res) => {
          this.unReadedMessagesCount = res?.countPending;
        });
     }
  }



  changeLanguage(): void {
    this.translation.handleLanguageChange();
  }
}
