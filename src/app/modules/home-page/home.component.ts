import { Component, ElementRef, inject, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { SharedService } from 'src/app/shared/services/shared/shared.service';

@Component({
  selector: 'app-current-user',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  
  currentUserScope = inject(UserService).getCurrentUserScope()
  get ScopeEnum() { return UserScope}
  currentSchoolId;
  currentSchoolEmployee;
  faChevronDown= faChevronDown
  faChevronUp=faChevronUp
  searchText;
  get claimsEnum() {return ClaimsEnum}


  cardsContentStatus=[
    {active : false},
    {active : false},
    {active : false},
    {active : false},
    {active : false},
    {active : false},
    {active : false},
    {active : false},
    {active : false},
    {active : false},
  ]

  cardsHoverStatus=[
    {active : false},
    {active : false},
    {active : false},
    {active : false},
    {active : false},
    {active : false},
    {active : false},
    {active : false},
    {active : false},
    {active : false},
  ]


  cards;

  constructor(private renderer: Renderer2, private sharedService:SharedService,private userService: UserService,private translate:TranslateService) { }

  ngOnInit(): void { 
  
    this.userService.currentUserSchoolId$.subscribe(id =>{      
      this.loadCardsItems(id);
    })
   
  }


  loadCardsItems(currentSchoolId)
  {
   this.cards=[
    {
      image:'assets/images/home/educational-setting.png',
      claims:[ClaimsEnum.S_Menu_EducationalSetting],
      content:{
        header: {
          title:this.translate.instant('sideBar.educationalSettings.title'),
          bgColor:'#EF8071'
        },
      
        list: [
          {label:this.translate.instant('sideBar.educationalSettings.children.Annual Holidays'), icon:'assets/images/home/educational-setting/calender.svg',url:'/dashboard/educational-settings/annual-holiday/annual-holiday-list', claims:[ClaimsEnum.S_MenuItem_Holiday]},
          {label:this.translate.instant('sideBar.educationalSettings.children.School Years'), icon:'assets/images/home/educational-setting/calender-user.svg',url:'/dashboard/educational-settings/school-year/school-years-list', claims:[ClaimsEnum.S_MenuItem_SchoolYear]},
          {label:this.translate.instant('sideBar.educationalSettings.children.Subjects'), icon:'assets/images/home/educational-setting/micro.svg',url:'/dashboard/educational-settings/subject/subjects-list', claims:[ClaimsEnum.S_MenuItem_SubjectMenu]},
          {label:this.translate.instant('sideBar.educationalSettings.children.surveysList'), icon:'assets/images/home/educational-setting/note-list.svg', url:'/dashboard/educational-settings/surveys',claims:[ClaimsEnum.S_MenuItem_Survey]},
          {label:this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'), icon:'assets/images/home/educational-setting/note-marked.svg',url:'/dashboard/educational-settings/assessments/assements-list',claims:[ClaimsEnum.S_MenuItem_Rate]},
        ]
      }

    },

    {
      image:'assets/images/home/reports-managment.png',
      claims:[ClaimsEnum.S_Menu_ReportsManagement],
      class:'flex-layout',
      content:{
        header: {
          title: this.translate.instant('sideBar.reportsManagment.title'),
          bgColor:'#CD578A'
        },
       
        list: [
          {label:this.translate.instant('sideBar.reportsManagment.chidren.studentsReport'), icon:'assets/images/home/report-managment/report-user.svg', url:'',claims:[ClaimsEnum.S_MenuItem_StudentReport]},
          {label:this.translate.instant('sideBar.reportsManagment.chidren.gurdiansReport'), icon:'assets/images/home/report-managment/report.svg', url:'',claims:[ClaimsEnum.S_MenuItem_GuardianReport]},
          {label: this.translate.instant('sideBar.reportsManagment.chidren.attendanceReport'), icon:'assets/images/home/report-managment/report-edge.svg', url:'',claims:[ClaimsEnum.S_MenuItem_AbsenceReport]},
          {label:this.translate.instant('sideBar.reportsManagment.chidren.schoolsReport'), icon:'assets/images/home/report-managment/report-marked.svg', url:'',claims:[ClaimsEnum.S_MenuItem_SchoolReport]},
          {label:this.translate.instant('sideBar.reportsManagment.chidren.gradesReport'), icon:'assets/images/home/report-managment/report-content.svg', url:'',claims:[ClaimsEnum.S_MenuItem_DegreesReport]},
          {label:this.translate.instant('sideBar.reportsManagment.chidren.EmployeesReport'), icon:'assets/images/home/report-managment/list.svg', url:'', claims:[ClaimsEnum.S_MenuItem_SubjectReport]},
          {label:this.translate.instant('sideBar.reportsManagment.chidren.TeachersReport'), icon:'assets/images/home/report-managment/report-user.svg', url:'',claims:[ClaimsEnum.S_MenuItem_SchoolEmployeeReport]},
          {label:this.translate.instant('sideBar.reportsManagment.chidren.subjectsReport'), icon:'assets/images/home/report-managment/report-line.svg', url:'',claims:[ClaimsEnum.S_MenuItem_SchoolTeacherReport]},
        ]
      }
    },

    {
      image:'assets/images/home/schools-and-students.png',
      claims:[ClaimsEnum.S_Menu_SchoolsAndStudents],
      content:{
        header: {
          title:this.translate.instant('sideBar.schoolsAndStudents.title'),
          bgColor:'#5CD0DF'
        },
       
        list: [
          {label:this.translate.instant('sideBar.schoolsAndStudents.chidren.schools'), icon:'assets/images/home/schools-students/graduation-cap.svg', url:'/dashboard/schools-and-students/schools',claims:[ClaimsEnum.S_MenuItem_SchoolMenu]},
          {label:this.translate.instant('sideBar.schoolsAndStudents.chidren.students'), icon:'assets/images/home/schools-students/user-graduate.svg', url:'/dashboard/schools-and-students/students',claims:[ClaimsEnum.S_MenuItem_StudentMenu]},
          {label:this.translate.instant('sideBar.schoolsAndStudents.chidren.parents'), icon:'assets/images/home/schools-students/parents.svg',url:'/dashboard/schools-and-students/all-parents',claims:[ClaimsEnum.S_MenuItem_GuardianMenu]},
        ]
      }
    },

    {
      image:'assets/images/home/manager-tools.png',
      claims:[ClaimsEnum.S_Menu_ManagarTools],
      content:{
        header: {
          title:this.translate.instant('sideBar.managerTools.title'),
          bgColor:'#D644B1'
        },
       
        list: [
          {label:this.translate.instant('sideBar.managerTools.children.Users'), icon:'assets/images/home/system-manager-tools/users.svg',url:'/dashboard/manager-tools/user-information/users-list',claims:[ClaimsEnum.S_MenuItem_user]},
          {label: this.translate.instant('sideBar.managerTools.children.Job Roles'), icon:'assets/images/home/system-manager-tools/user.svg', url:'/dashboard/manager-tools/user-roles/user-roles-list',claims:[ClaimsEnum.S_MenuItem_Role]},
          {label:this.translate.instant('sideBar.managerTools.children.systemSettings'), icon:'assets/images/home/system-manager-tools/fix.svg',url:'/dashboard/managerTools/settings',claims:[ClaimsEnum.S_MenuItem_Setting]},
          {label: this.translate.instant('sideBar.managerTools.children.System List'), icon:'assets/images/home/system-manager-tools/list.svg',url:'/dashboard/manager-tools/indexes/indexes-list',claims:[ClaimsEnum.S_MenuItem_Index]},
        ]
      }
    },

    {
      image:'assets/images/home/performance-managment.png',
      claims:[ClaimsEnum.S_Menu_PeformanceManagment],
      content:{
        header: {
          title:this.translate.instant('breadcrumb.performanceMangement'),
          bgColor:'#F8C073'
        },
     
        list: [
          {label:this.translate.instant('sideBar.performanceManagment.chidren.exams'), icon:'assets/images/home/performance-managment/list.svg', url:'',claims:[ClaimsEnum.S_MenuItem_Exam]},
          {label:this.translate.instant('dashboard.Requests.RequestList'), icon:'assets/images/home/performance-managment/note-list.svg',url:'/dashboard/performance-managment/RequestList/Request-List',claims:[ClaimsEnum.S_MenuItem_Request]},
        ]
      }

    },
    {
      image:'assets/images/home/educational-setting.png',
      claims:[ClaimsEnum.E_menu_ManageStudents],
      content:{
        header: {
          title:this.translate.instant('dashboard.students.studentsMangement'),
          bgColor:'#EF8071'
        },
      
        list: [
          {label: this.translate.instant('sideBar.schoolsAndStudents.chidren.parents'), icon:'assets/images/home/educational-setting/calender.svg',url:'/dashboard/student-management/all-parents', claims:[ClaimsEnum.E_MenuItem_parents]},
          {label:this.translate.instant('sideBar.schoolsAndStudents.chidren.students'), icon:'assets/images/home/educational-setting/calender-user.svg',url:'/dashboard/student-management/students', claims:[ClaimsEnum.E_MenuItem_Students]},
          {label:this.translate.instant('dashboard.Requests.RequestList'), icon:'assets/images/home/educational-setting/micro.svg',url:'/dashboard/performance-managment//RequestList', claims:[ClaimsEnum.E_MenuItem_Requests]},
     
        ]
      }

    },
    {
      image:'assets/images/home/reports-managment.png',
      claims:[ClaimsEnum.E_menu_ManageSchoolEmployee],
      content:{
        header: {
          title: this.translate.instant('dashboard.schools.schoolEmployeeMangement'),
          bgColor:'#CD578A'
        },
     
        list: [
          {label:this.translate.instant('breadcrumb.Employees'), icon:'assets/images/home/report-managment/report-user.svg', url:'/dashboard/schoolEmployee-management/school/2/employees',claims:[ClaimsEnum.E_MenuItem_SchoolEmployee]},

        ]
      }
    },
    {
      image:'assets/images/home/schools-and-students.png',
      claims:[ClaimsEnum.E_Menu_ManageGradesAndDivisions],
      content:{
        header: {
          title:this.translate.instant('breadcrumb.GradesAndDivisionsMangement'),
          bgColor:'#5CD0DF'
        },
       
        list: [
          {label: this.translate.instant('dashboard.schools.schoolClasses'), icon:'assets/images/home/schools-students/graduation-cap.svg', url:`/dashboard/grades-and-divisions/school/${currentSchoolId}/grades`,claims:[ClaimsEnum.E_MenuItem_SchoolGrades]},
          {label:this.translate.instant('dashboard.schools.schoolTracks'), icon:'assets/images/home/schools-students/user-graduate.svg', url:`/dashboard/grades-and-divisions/school/${currentSchoolId}/divisions`,claims:[ClaimsEnum.E_MenuItem_SchoolDivisions]},
         
        ]
      }
    },
    
    {
      image:'assets/images/home/manager-tools.png',
      claims:[ClaimsEnum.E_menu_SchoolPerformanceManagent],
      content:{
        header: {
          title: this.translate.instant('breadcrumb.performanceMangement'),
          bgColor:'#D644B1'
        },
     
        list: [
          {label:this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'), icon:'assets/images/home/system-manager-tools/fix.svg',url:'/dashboard/educational-settings/assessments/assements-list', claims:[ClaimsEnum.E_MenuItem_Evaluation]},
          {label:this.translate.instant('sideBar.performanceManagment.chidren.exams'), icon:'assets/images/home/system-manager-tools/list.svg',url:'/dashboard/performance-managment/assignments/assignments-list',claims:[ClaimsEnum.E_MenuItem_Exams]},
        ]
      }
    },
    {
      image:'assets/images/home/performance-managment.png',
      claims:[ClaimsEnum.E_Menu_ManageSchool],
      content:{
        header: {
          title:this.translate.instant('dashboard.schools.schoolMangement'),
          bgColor:'#F8C073'
        },
     
        list: [
          {label:this.translate.instant('dashboard.schools.generalInfo'), icon:'assets/images/home/performance-managment/list.svg', url:`/dashboard/school-management/school/${currentSchoolId}`,claims:[ClaimsEnum.E_MenuItem_GeneralInfo]},
          {label:this.translate.instant('sideBar.educationalSettings.children.Subjects'), icon:'assets/images/home/performance-managment/note-list.svg',url:`/dashboard/school-management/school/${currentSchoolId}/subjects`,claims:[ClaimsEnum.E_MenuItem_Subjects]},
          {label:this.translate.instant('sideBar.educationalSettings.children.Annual Holidays'), icon:'assets/images/home/performance-managment/list.svg', url:`/dashboard/school-management/school/${currentSchoolId}/annual-holidays`,claims:[ClaimsEnum.E_MenuItem_AnnualHolidays]},
          {label:this.translate.instant('dashboard.schools.editableList'), icon:'assets/images/home/performance-managment/note-list.svg',url:`/dashboard/school-management/school/${currentSchoolId}/edit-list`, claims:[ClaimsEnum.E_MenuItem_EditList]},
        ]
      }

    }


  ]

  }

}
