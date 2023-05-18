import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';

@Component({
  selector: 'app-current-user',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ConfirmationService],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  get fileTypesEnum () {return FileTypeEnum}
  lang= inject(TranslationService).lang;
  isOpend:boolean[]=[];
  messages=[];
  currentUserScope = inject(UserService).getCurrentUserScope()
  get ScopeEnum() { return UserScope}
  currentSchoolName
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

  constructor(
    private authService: AuthenticationService,
    public userService: UserService,
    private translate:TranslateService) { }

  ngOnInit(): void {

    this.userService.currentUserSchoolId$.subscribe(id =>{
      this.loadCardsItems(id);
    })

   if(this.currentUserScope==UserScope.Employee)
   {
    this.userService.currentUserSchoolName$.subscribe(res =>{
      if(res)
      {this.currentSchoolName=typeof  res === 'string' ? (JSON.parse(res))[this.lang] :  res[this.lang]}
      })
    this.getUregentMessages()
   }

  }


  getUregentMessages(){
    this.authService.getSchoolUrgentMessage(this.userService.getCurrentUserId()).subscribe((res)=>{
      this.messages=res;
      this.userService.setschoolUrgentMessages(this.messages?.length);

      res.forEach((message,i) => {
        this.isOpend[i]=true;
        // this.messages.push(message);
       });


     })
  }

  confirm(i,messageId){

    var readMessages=[];
    readMessages.push(messageId);
    this.authService.markSchoolUrgentMessage({"messageIds":readMessages}).subscribe((res)=>{
      this.isOpend[i]=false;
      this.messages.length-=1;
      this.userService.setschoolUrgentMessages(this.messages?.length);
    })
  }



  loadCardsItems(currentSchoolId)
  {
   this.cards=[
    {
      image:'assets/images/home/schools-and-students.png',
      claims:[ClaimsEnum.S_Menu_SchoolsAndStudents],
      content:{
        header: {
          title:this.translate.get('sideBar.schoolsAndStudents.title'),
          bgColor:'#5CD0DF'
        },

      },
      list: [
        {label:this.translate.get('sideBar.schoolsAndStudents.chidren.schools'), icon:'assets/images/home/schools-students/graduation-cap.svg', url:'/schools-and-students/schools',claims:[ClaimsEnum.S_MenuItem_SchoolMenu]},
        {label:this.translate.get('sideBar.schoolsAndStudents.chidren.students'), icon:'assets/images/home/schools-students/user-graduate.svg', url:'/schools-and-students/students',claims:[ClaimsEnum.S_MenuItem_StudentMenu]},
        {label:this.translate.get('sideBar.schoolsAndStudents.chidren.parents'), icon:'assets/images/home/schools-students/parents.svg',url:'/schools-and-students/all-parents',claims:[ClaimsEnum.S_MenuItem_GuardianMenu]},
      ]
    },
    {
      image:'assets/images/home/performance-managment.png',
      claims:[ClaimsEnum.S_Menu_PeformanceManagment],
      content:{
        header: {
          title:this.translate.get('breadcrumb.performanceMangement'),
          bgColor:'#F8C073'
        },

      },
      list: [
        {label:this.translate.get('sideBar.performanceManagment.chidren.exams'), icon:'assets/images/home/performance-managment/list.svg', url:'/performance-managment/assignments/assignments-list',claims:[ClaimsEnum.SE_MenuItem_Exam]},
        {label:this.translate.get('dashboard.Requests.RequestList'), icon:'assets/images/home/performance-managment/note-list.svg',url:'/performance-managment/RequestList/',claims:[ClaimsEnum.S_MenuItem_Request]},
        {label:this.translate.get('sideBar.educationalSettings.children.Subjects Assessments'), icon:'assets/images/home/educational-setting/note-marked.svg',url:'/performance-managment/assessments/assements-list',claims:[ClaimsEnum.SE_MenuItem_Rate]},


      ]

    },
    {
      image:'assets/images/home/manager-tools.png',
      claims:[ClaimsEnum.S_Menu_ManagarTools],
      content:{
        header: {
          title:this.translate.get('sideBar.managerTools.title'),
          bgColor:'#D644B1'
        },

      },
      list: [
        {label:this.translate.get('sideBar.managerTools.children.Users'), icon:'assets/images/home/system-manager-tools/users.svg',url:'/manager-tools/user-information/users-list',claims:[ClaimsEnum.S_MenuItem_user]},
        {label: this.translate.get('sideBar.managerTools.children.Job Roles'), icon:'assets/images/home/system-manager-tools/user.svg', url:'/manager-tools/user-roles/user-roles-list',claims:[ClaimsEnum.S_MenuItem_Role]},
        {label:this.translate.get('sideBar.managerTools.children.systemSettings'), icon:'assets/images/home/system-manager-tools/fix.svg',url:'/manager-tools/settings',claims:[ClaimsEnum.S_MenuItem_Setting]},
        {label: this.translate.get('sideBar.managerTools.children.System List'), icon:'assets/images/home/system-manager-tools/list.svg',url:'/manager-tools/indexes/indexes-list',claims:[ClaimsEnum.S_MenuItem_Index]},
        {label:this.translate.get('breadcrumb.NotificationsSettings'), icon:'assets/images/home/system-manager-tools/fix.svg',url:'/performance-managment/notifications/',claims:[ClaimsEnum.S_MenuItem_Setting]},

      ]
    },

    {
      image:'assets/images/home/reports-managment.png',
      claims:[ClaimsEnum.S_Menu_ReportsManagement],
      class:'flex-layout',
      content:{
        header: {
          title: this.translate.get('sideBar.reportsManagment.title'),
          bgColor:'#CD578A'
        },

      },
      list: [
        {label:this.translate.get('sideBar.reportsManagment.chidren.studentsReport'), icon:'assets/images/home/report-managment/report-user.svg', url:'/reports-managment/students-reports',claims:[ClaimsEnum.S_MenuItem_StudentReport]},
        {label:this.translate.get('sideBar.reportsManagment.chidren.gurdiansReport'), icon:'assets/images/home/report-managment/report.svg', url:'/reports-managment/parents-reports',claims:[ClaimsEnum.S_MenuItem_GuardianReport]},
        {label: this.translate.get('sideBar.reportsManagment.chidren.attendanceReport'), icon:'assets/images/home/report-managment/report-edge.svg', url:'/reports-managment/attendance-reports',claims:[ClaimsEnum.S_MenuItem_AbsenceReport]},
        {label:this.translate.get('sideBar.reportsManagment.chidren.schoolsReport'), icon:'assets/images/home/report-managment/report-marked.svg', url:'/reports-managment/schools-reports',claims:[ClaimsEnum.S_MenuItem_SchoolReport]},
        {label:this.translate.get('sideBar.reportsManagment.chidren.gradesReport'), icon:'assets/images/home/report-managment/report-content.svg', url:'/reports-managment/degrees-reports',claims:[ClaimsEnum.S_MenuItem_DegreesReport]},
        {label:this.translate.get('sideBar.reportsManagment.chidren.subjectsReport'), icon:'assets/images/home/report-managment/list.svg', url:'/reports-managment/subjects-reports', claims:[ClaimsEnum.S_MenuItem_SubjectReport]},
        {label:this.translate.get('sideBar.reportsManagment.chidren.EmployeesReport'), icon:'assets/images/home/report-managment/report-user.svg', url:'/reports-managment/users-reports',claims:[ClaimsEnum.S_MenuItem_SchoolEmployeeReport]},
        {label:this.translate.get('sideBar.reportsManagment.chidren.TeachersReport'), icon:'assets/images/home/report-managment/report-line.svg', url:'/reports-managment/teachers-reports',claims:[ClaimsEnum.S_MenuItem_SchoolTeacherReport]},
      ]
    },

    {
      image:'assets/images/home/educational-setting.png',
      claims:[ClaimsEnum.S_Menu_EducationalSetting],
      content:{
        header: {
          title:this.translate.get('sideBar.educationalSettings.title'),
          bgColor:'#EF8071'
        },

      },
      list: [
        {label:this.translate.get('sideBar.educationalSettings.children.Annual Holidays'), icon:'assets/images/home/educational-setting/calender.svg',url:'/educational-settings/annual-holiday/annual-holiday-list', claims:[ClaimsEnum.S_MenuItem_Holiday]},
        {label:this.translate.get('sideBar.educationalSettings.children.School Years'), icon:'assets/images/home/educational-setting/calender-user.svg',url:'/educational-settings/school-year/school-years-list', claims:[ClaimsEnum.S_MenuItem_SchoolYear]},
        {label:this.translate.get('sideBar.educationalSettings.children.Subjects'), icon:'assets/images/home/educational-setting/micro.svg',url:'/educational-settings/subject/subjects-list', claims:[ClaimsEnum.S_MenuItem_SubjectMenu]},
        {label:this.translate.get('sideBar.educationalSettings.children.surveysList'), icon:'assets/images/home/educational-setting/note-list.svg', url:'/educational-settings/surveys',claims:[ClaimsEnum.S_MenuItem_Survey]},
      ]

    },




    {
      image:'assets/images/home/educational-setting.png',
      claims:[ClaimsEnum.E_menu_ManageStudents],
      content:{
        header: {
          title:this.translate.get('dashboard.students.studentsMangement'),
          bgColor:'#EF8071'
        },

      },
      list: [
        {label: this.translate.get('sideBar.schoolsAndStudents.chidren.parents'), icon:'assets/images/home/educational-setting/calender.svg',url:'/student-management/all-parents', claims:[ClaimsEnum.E_MenuItem_parents]},
        {label:this.translate.get('sideBar.schoolsAndStudents.chidren.students'), icon:'assets/images/home/educational-setting/calender-user.svg',url:'/student-management/students', claims:[ClaimsEnum.E_MenuItem_Students]},

      ]

    },

    {
      image:'assets/images/home/schools-and-students.png',
      claims:[ClaimsEnum.E_Menu_ManageGradesAndDivisions],
      content:{
        header: {
          title:this.translate.get('breadcrumb.GradesAndDivisionsMangement'),
          bgColor:'#5CD0DF'
        },

      },
      list: [
        {label: this.translate.get('dashboard.schools.schoolClasses'), icon:'assets/images/home/schools-students/graduation-cap.svg', url:`/grades-and-divisions/school/${currentSchoolId}/grades`,claims:[ClaimsEnum.E_MenuItem_SchoolGrades]},
        {label:this.translate.get('dashboard.schools.schoolTracks'), icon:'assets/images/home/schools-students/user-graduate.svg', url:`/grades-and-divisions/school/${currentSchoolId}/divisions`,claims:[ClaimsEnum.E_MenuItem_SchoolDivisions]},

      ]
    },
    {
      image:'assets/images/home/reports-managment.png',
      claims:[ClaimsEnum.E_menu_ManageSchoolEmployee],
      content:{
        header: {
          title: this.translate.get('dashboard.schools.schoolEmployeeMangement'),
          bgColor:'#CD578A'
        },

      },
      list: [
        {label:this.translate.get('breadcrumb.Employees'), icon:'assets/images/home/report-managment/report-user.svg', url:'/schoolEmployee-management/school/2/employees',claims:[ClaimsEnum.E_MenuItem_SchoolEmployee]},

      ]
    },

    {
      image:'assets/images/home/manager-tools.png',
      claims:[ClaimsEnum.E_menu_SchoolPerformanceManagent],
      content:{
        header: {
          title: this.translate.get('breadcrumb.performanceMangement'),
          bgColor:'#D644B1'
        },
      },
      list: [
        {label:this.translate.get('sideBar.educationalSettings.children.Subjects Assessments'), icon:'assets/images/home/system-manager-tools/fix.svg',url:'/school-performance-managent/assessments/assements-list', claims:[ClaimsEnum.SE_MenuItem_Rate]},
        {label:this.translate.get('sideBar.performanceManagment.chidren.exams'), icon:'assets/images/home/system-manager-tools/list.svg',url:'/school-performance-managent/assignments/assignments-list',claims:[ClaimsEnum.SE_MenuItem_Exam]},
      ]
    },
    {
      image:'assets/images/home/performance-managment.png',
      claims:[ClaimsEnum.E_Menu_ManageSchool],
      content:{
        header: {
          title:this.translate.get('dashboard.schools.schoolMangement'),
          bgColor:'#F8C073'
        },
      },
      list: [
        {label:this.translate.get('dashboard.schools.generalInfo'), icon:'assets/images/home/performance-managment/list.svg', url:`/school-management/school/${currentSchoolId}`,claims:[ClaimsEnum.E_MenuItem_GeneralInfo]},
        {label:this.translate.get('sideBar.educationalSettings.children.Subjects'), icon:'assets/images/home/performance-managment/note-list.svg',url:`/school-management/school/${currentSchoolId}/subjects`,claims:[ClaimsEnum.E_MenuItem_Subjects]},
        {label:this.translate.get('sideBar.educationalSettings.children.Annual Holidays'), icon:'assets/images/home/performance-managment/list.svg', url:`/school-management/school/${currentSchoolId}/annual-holidays`,claims:[ClaimsEnum.E_MenuItem_AnnualHolidays]},
        {label:this.translate.get('dashboard.schools.editableList'), icon:'assets/images/home/performance-managment/note-list.svg',url:`/school-management/school/${currentSchoolId}/edit-list`, claims:[ClaimsEnum.SE_MenuItem_EditList]},
        {label:this.translate.get('dashboard.Requests.myRequests'), icon:'assets/images/home/educational-setting/micro.svg',url:'/school-management/requests-list/my-requests', queryParams:{isMyRequests:true} ,claims:[ClaimsEnum.E_MenuItem_Requests]},
        {label:this.translate.get('dashboard.Requests.requestsToMe'), icon:'assets/images/home/educational-setting/micro.svg',url:'/school-management/requests-list', claims:[ClaimsEnum.E_MenuItem_Requests]},

      ]

    }


  ]

  }

}
